import { CartDto, CartItemDto } from "../dtos/Cart.dto";
import { CartEntity, CartItemEntity } from "../entities/Cart.entity";
import prisma from "@/lib/prisma";

export interface ICartRepository {
  // FIND methods
  findCartByUserId(userId: string): Promise<CartEntity>;
  findCartById(cartId: string): Promise<CartEntity>;
  findCartItemById(cartItemId: string): Promise<CartItemEntity | null>;
  findAllItemsByCartId(cartId: string): Promise<CartItemEntity[]>;

  // CREATE methods
  createCartWithItem(userId: string, data: CartDto): Promise<CartEntity>;
  addItemToCart(cartId: string, itemData: CartItemDto): Promise<CartEntity>;

  // UPDATE methods
  updateItemQuantity(
    cartItemId: string,
    newQuantity: number
  ): Promise<CartEntity>;
  updateCartTotalPrice(cartId: string, newTotal: number): Promise<CartEntity>;

  // DELETE methods
  deleteCartById(cartId: string): Promise<void>;
  deleteCartItemById(cartItemId: string): Promise<void>;
}
export class CartRepository implements ICartRepository {
  async findCartByUserId(userId: string): Promise<CartEntity> {
    const finndcart = await prisma.cart.findFirst({
      where: { userId },
    });
    return finndcart as unknown as CartEntity;
  }
  async findCartById(cartId: string): Promise<CartEntity> {
    const findCart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: true,
      },
    });
    return findCart as unknown as CartEntity;
  }
  async findCartItemById(cartItemId: string): Promise<CartItemEntity | null> {
    const findcartByItemId = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    return findcartByItemId as unknown as CartItemEntity;
  }
  async findAllItemsByCartId(cartId: string): Promise<CartItemEntity[]> {
    const findAll = await prisma.cartItem.findMany({
      where: { cartId: cartId },
    });
    return findAll as unknown as CartItemEntity[];
  }

  async createCartWithItem(userId: string, data: CartDto): Promise<CartEntity> {
    const initialTotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newCart = await prisma.cart.create({
      data: {
        userId: userId,
        serviceId: data.serviceId,
        TotalPrice: initialTotal,
        items: {
          create: data.items.map((item) => ({
            itemId: item.itemId,
            price: item.price,
            quantity: item.quantity,
            addOnName: item.addOnName,
            addOnPrice: item.addOnPrice,
          })),
        },
      },
      include: { items: true },
    });
    return newCart as unknown as CartEntity;
  }
  async addItemToCart(
    cartId: string,
    itemData: CartItemDto
  ): Promise<CartEntity> {
    const addtoitem = await prisma.cartItem.create({
      data: {
        cartId: cartId,
        itemId: itemData.itemId,
        price: itemData.price,
        quantity: itemData.quantity,
        addOnName: itemData.addOnName,
        addOnPrice: itemData.addOnPrice,
      },
    });
    return addtoitem as unknown as CartEntity;
  }
  async updateItemQuantity(
    cartItemId: string,
    newQuantity: number
  ): Promise<CartEntity> {
    const updateItemQuantity = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });
    return updateItemQuantity as unknown as CartEntity;
  }
  async updateCartTotalPrice(
    cartId: string,
    newTotal: number
  ): Promise<CartEntity> {
    const updateTotalPrice = await prisma.cart.update({
      where: { id: cartId },
      data: {
        TotalPrice: newTotal,
      },
    });
    return updateTotalPrice as unknown as CartEntity;
  }
  async deleteCartById(cartId: string): Promise<void> {
    await prisma.cart.delete({
      where: { id: cartId },
    });
  }
  async deleteCartItemById(cartItemId: string): Promise<void> {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
