import { CartDto } from "../dtos/Cart.dto";
import { CartEntity } from "../entities/Cart.entity";
import { ICartRepository } from "../repositories/ICartRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { UpdateQuantityDto } from "../dtos/Cart.dto";
type AddToCartResponse =
  | CartEntity
  | { status: "conflict"; message: string; conflictingServiceId: string };

export class Cartusecase {
  constructor(
    private cartRepository: ICartRepository,
    private userRepository: IUserRepository
  ) {}
  private async _recalculateAndupdatetotal(
    cartId: string
  ): Promise<CartEntity> {
    const items = await this.cartRepository.findAllItemsByCartId(cartId);
    const newTotalPrice = items.reduce((sum, item) => {
      let itemTotal = item.price * item.quantity;
      if (item.addOnPrice) {
        // Corrected logic: Addon price should also be multiplied by quantity.
        itemTotal += item.addOnPrice * item.quantity;
      }
      return sum + itemTotal;
    }, 0);
    const updateTotal = await this.cartRepository.updateCartTotalPrice(
      cartId,
      newTotalPrice
    );
    return updateTotal;
  }

  async addToCartUsecase(
    data: CartDto,
    userId: string
  ): Promise<AddToCartResponse> {
    const existingUser = await this.userRepository.findByFireBaseUid(userId);
    if (!existingUser) throw new Error("User does not exist");

    const dbUserid = existingUser.id;
    const existingCart = await this.cartRepository.findCartByUserId(dbUserid);
    if (!existingCart) {
      const newCart = await this.cartRepository.createCartWithItem(
        dbUserid,
        data
      );
      return newCart;
    }
    if (existingCart && existingCart.serviceId === data.serviceId) {
      for (const item of data.items) {
        await this.cartRepository.addItemToCart(existingCart.id, item);
      }
      await this._recalculateAndupdatetotal(existingCart.id);
      const updateCart = await this.cartRepository.findCartById(
        existingCart.id
      );
      return updateCart;
    } else {
      return {
        status: "conflict",
        message:
          "You have items from another service. Do you want to clear the old cart and start a new one?",
        conflictingServiceId: existingCart.serviceId,
      };
    }
  }

  async replaceCartUsecase(data: CartDto, userId: string): Promise<CartEntity> {
    const existingUser = await this.userRepository.findByFireBaseUid(userId);
    if (!existingUser) throw new Error("User does not exist");

    const userDb = existingUser.id;
    const oldCart = await this.cartRepository.findCartByUserId(userDb);
    if (oldCart) {
      await this.cartRepository.deleteCartById(oldCart.id);
    }
    const newCart = await this.cartRepository.createCartWithItem(userDb, data);
    return newCart;
  }
  async updateCartusecase(
    cartItemId: string,
    data: UpdateQuantityDto
  ): Promise<CartEntity | null> {
    const existingItem = await this.cartRepository.findCartItemById(cartItemId);
    if (!existingItem) throw new Error("Cart item does not exist");

    const parentCartId = existingItem.cartId;
    if (data.quantity <= 0) {
      await this.cartRepository.deleteCartItemById(cartItemId);
      // Check if the cart is now empty
      const remainingItems = await this.cartRepository.findAllItemsByCartId(
        parentCartId
      );
      if (remainingItems.length === 0) {
        await this.cartRepository.deleteCartById(parentCartId);
        return null;
      }
    } else {
      await this.cartRepository.updateItemQuantity(cartItemId, data.quantity);
    }
    await this._recalculateAndupdatetotal(parentCartId);

    const updatedCart = await this.cartRepository.findCartById(parentCartId);
    return updatedCart;
  }
  async deleteCartItemUsecase(cartItemId: string): Promise<CartEntity | null> {
    // This is a simplified version of the update usecase where quantity is 0
    return this.updateCartusecase(cartItemId, { quantity: 0 });
  }
  async getCartUsecase(userId: string): Promise<CartEntity | null> {
    const existingUser = await this.userRepository.findByFireBaseUid(userId);
    if (!existingUser) throw new Error("User does not exist");
    return this.cartRepository.findCartByUserId(existingUser.id);
  }
}
