import { IWishListRepository } from "../repositories/wishListRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { wishListEntity } from "../entities/wishlist.entity";
import { wishListDto } from "../dtos/wishlist.dto";
type ToggleResponse = {
  status: "added" | "removed";
};
export class WishListUsecase {
  constructor(
    private wishlistRepository: IWishListRepository,
    private userrepository: IUserRepository
  ) {}

  async toggleWishlistItemusecase(
    userId: string,
    data: wishListDto
  ): Promise<ToggleResponse> {
    const existingUser = await this.userrepository.findByFireBaseUid(userId);
    if (!existingUser) {
      throw new Error("userId is required");
    }
    const dbuserId = existingUser.id;
    const serviceId = data.serviceId;
    const existingwishlistItem = await this.wishlistRepository.find(
      dbuserId,
      serviceId
    );
    if (!existingwishlistItem) {
      await this.wishlistRepository.create(dbuserId, serviceId);
      return { status: "added" };
    } else {
      await this.wishlistRepository.delete(existingwishlistItem.id);
      return { status: "removed" };
    }
  }

  async getWishlistForUser(userId: string): Promise<wishListEntity[]> {
    const existingUser = await this.userrepository.findByFireBaseUid(userId);
    if (!existingUser) {
      throw new Error("userId is required");
    }
    const dbuserId = existingUser.id;
    const getAllItem = await this.wishlistRepository.findAllItemuserById(
      dbuserId
    );
    return getAllItem;
  }
}
