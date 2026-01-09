import { NextResponse, NextRequest } from "next/server";
import { ServicesRepository } from "../../../core/repositories/IServiceRepository";
import { ServiceUsecase } from "@/core/usecases/Services.usecase";
import { CategoryRepository } from "@/core/repositories/ICategoryRepository";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { getUserIdFromRequest } from "@/lib/auth";
const categoryRepository = new CategoryRepository();
const serviceRepository = new ServicesRepository();
const userRepository = new UserRepository();
const serviceusecases = new ServiceUsecase(
  serviceRepository,
  categoryRepository
);
export async function POST(request: NextRequest) {
  try {
    const serviceData = await request.json();

    const firebaseUid = await getUserIdFromRequest(request);

    const user = await userRepository.findByFireBaseUid(firebaseUid);

    if (!user) {
      throw new Error("User not found in our database.");
    }

    const ownerId = user.id;

    const newService = await serviceusecases.createServiceUsecase(
      serviceData,
      ownerId
    );

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create services." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const AllServices = await serviceusecases.findAllServiceUsecase();
    return NextResponse.json(AllServices, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create services." },
      { status: 500 }
    );
  }
}
