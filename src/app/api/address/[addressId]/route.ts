import { NextRequest, NextResponse } from "next/server";
import { AddressUsecase } from "@/core/usecases/Address.usecase";
import { AddressRepository } from "@/core/repositories/IAddressRepository";
import { AddressDto } from "@/core/dtos/Address.dto";
import { getUserIdFromRequest } from "@/lib/auth";

const addressRepository = new AddressRepository();
const addressUsecase = new AddressUsecase(addressRepository);

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
    const { addressId } = await params;
    const userId = await getUserIdFromRequest(request);
    const body: AddressDto = await request.json();

    const updatedAddress = await addressUsecase.updateAddressUsecase(
      userId,
      addressId,
      body
    );

    return NextResponse.json(updatedAddress, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating address:", error);
    return NextResponse.json(
      {
        message: "Failed to update address.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
    const { addressId } = await params;
    const userId = await getUserIdFromRequest(request);

    await addressUsecase.deleteAddressUsecase(userId, addressId);

    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error: unknown) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      {
        message: "Failed to deleting address.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
