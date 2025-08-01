import { NextResponse, NextRequest } from "next/server";
import { wishListDto } from "@/core/dtos/wishlist.dto";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { WishListRepository } from "@/core/repositories/wishListRepository";
import { WishListUsecase } from "@/core/usecases/WishList.usecase";
import { getUserIdFromRequest } from "@/lib/auth";
const userReposiotry = new UserRepository();
const wishlistRepository = new WishListRepository();
const WishlistUsecase = new WishListUsecase(wishlistRepository, userReposiotry);

export async function POST(request: NextRequest) {
  try {
    const data: wishListDto = await request.json();
    const userId = await getUserIdFromRequest(request);
    const wishlist = await WishlistUsecase.toggleWishlistItemusecase(
      userId,
      data
    );
    return NextResponse.json(wishlist, { status: 201 });
  } catch (error: unknown) {
    console.error("Error  add and delete to wishlist :", error);
    return NextResponse.json(
      {
        message: "Failed to add and delete to cart  ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    const getWishlist = await WishlistUsecase.getWishlistForUser(userId);
    return NextResponse.json(getWishlist, { status: 201 });
  } catch (error: unknown) {
    console.error("Error  get from wishlist :", error);
    return NextResponse.json(
      {
        message: "Failed to get from wishlist  ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
