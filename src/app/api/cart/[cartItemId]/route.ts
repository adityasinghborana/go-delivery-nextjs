import { NextResponse, NextRequest } from "next/server";
import { CartRepository } from "@/core/repositories/ICartRepository";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { Cartusecase } from "@/core/usecases/Cart.usecase";
import { UpdateQuantityDto } from "@/core/dtos/Cart.dto";
const cartRepository = new CartRepository();
const userRespository = new UserRepository();
const cartusecase = new Cartusecase(cartRepository, userRespository);

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ cartItemId: string }> }
) {
  try {
    const { cartItemId } = await params;
    const updateData: UpdateQuantityDto = await request.json();
    const updateCart = await cartusecase.updateCartusecase(
      cartItemId,
      updateData
    );
    return NextResponse.json(updateCart, { status: 201 });
  } catch (error: unknown) {
    console.error("Error update to cart :", error);
    return NextResponse.json(
      {
        message: "Failed to update to cart  ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ cartItemId: string }> }
) {
  try {
    const { cartItemId } = await params;
    await cartusecase.deleteCartItemUsecase(cartItemId);
    return NextResponse.json(null, { status: 201 });
  } catch (error: unknown) {
    console.error("Error delete to cart :", error);
    return NextResponse.json(
      {
        message: "Failed to delete to cart  ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
