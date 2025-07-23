import { NextRequest, NextResponse } from "next/server";
import { AddressUsecase } from "@/core/usecases/Address.usecase";
import { AddressRepository } from "@/core/repositories/IAddressRepository";
import { AddressDto } from "@/core/dtos/Address.dto";
import { getUserIdFromRequest } from "@/lib/auth";

const addressRepository = new AddressRepository();
const addressUsecase = new AddressUsecase(addressRepository);

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    const addresses = await addressUsecase.getAddressUsecase(userId);
    return NextResponse.json(addresses, { status: 200 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to get address." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    const body: AddressDto = await request.json();
    const newAddress = await addressUsecase.addAddress(userId, body);
    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to post address." },
      { status: 500 }
    );
  }
}
