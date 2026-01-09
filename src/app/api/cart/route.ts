import { NextResponse, NextRequest } from "next/server";
import { CartDto } from "@/core/dtos/Cart.dto";
import { CartRepository } from "@/core/repositories/ICartRepository";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { Cartusecase } from "@/core/usecases/Cart.usecase";
import { getUserIdFromRequest } from "@/lib/auth";
const cartRepository = new CartRepository();
const userRespository = new UserRepository();
const cartusecase = new Cartusecase(cartRepository, userRespository);
export async function POST(request: NextRequest) {
  try {
    const data: CartDto = await request.json();
    const userId = await getUserIdFromRequest(request);
    const addtocart = await cartusecase.addToCartUsecase(data, userId);
    return NextResponse.json(addtocart, { status: 201 });
  } catch (error: unknown) {
    console.error("Error add to cart :", error);
    return NextResponse.json(
      {
        message: "Failed to add to cart  ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    const getCart = await cartusecase.getCartUsecase(userId);
    return NextResponse.json(getCart, { status: 201 });
  } catch (error: unknown) {
    console.error("Error get to cart :", error);
    return NextResponse.json(
      {
        message: "Failed to get to cart  ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
