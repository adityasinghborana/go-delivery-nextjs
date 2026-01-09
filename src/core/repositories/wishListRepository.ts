import { wishListEntity } from "../entities/wishlist.entity";
import prisma from "@/lib/prisma";

export interface IWishListRepository {
  find(userId: string, serviceId: string): Promise<wishListEntity | null>; //to find wishlist is present or not
  create(userId: string, serviceId: string): Promise<wishListEntity>;
  delete(id: string): Promise<void>;
  findAllItemuserById(userId: string): Promise<wishListEntity[]>;
}
export class WishListRepository implements IWishListRepository {
  async find(userId: string, serviceId: string): Promise<wishListEntity> {
    const findwishlist = await prisma.wishListItem.findFirst({
      where: { serviceId, userId },
    });
    return findwishlist as unknown as wishListEntity;
  }
  async create(userId: string, serviceId: string): Promise<wishListEntity> {
    const create = await prisma.wishListItem.create({
      data: {
        userId: userId,
        serviceId: serviceId,
      },
      include: {
        service: true,
      },
    });
    return create as unknown as wishListEntity;
  }
  async findAllItemuserById(userId: string): Promise<wishListEntity[]> {
    const allwishlistItem = await prisma.wishListItem.findMany({
      where: { userId },
      include: {
        service: true,
      },
    });
    return allwishlistItem as unknown as wishListEntity[];
  }
  async delete(id: string): Promise<void> {
    await prisma.wishListItem.delete({
      where: { id },
    });
  }
}
