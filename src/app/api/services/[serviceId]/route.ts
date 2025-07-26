import { NextRequest, NextResponse } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { CategoryRepository } from "@/core/repositories/ICategoryRepository";
import { ServiceUsecase } from "@/core/usecases/Services.usecase";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { getUserIdFromRequest } from "@/lib/auth";
import { servicesDto } from "@/core/dtos/Services.dto";
const serviceRepository = new ServicesRepository();
const categoryRepository = new CategoryRepository();
const userRepository = new UserRepository();
const serviceusecases = new ServiceUsecase(
  serviceRepository,
  categoryRepository
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params;
    const service = await serviceusecases.findByServiceIdusecase(serviceId);
    if (!service) {
      return NextResponse.json(
        { message: "service id is not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(service, { status: 201 });
  } catch (error: unknown) {
    console.error("Error fetching service by id:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch service.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params;
    const serviceData: servicesDto = await request.json();
    const firebaseUid = await getUserIdFromRequest(request);
    const user = await await userRepository.findByFireBaseUid(firebaseUid);
    if (!user) {
      throw new Error("User not found in our database.");
    }
    const userId = user.id;
    const updateService = await serviceusecases.updateServiceUsecase(
      serviceData,
      serviceId,
      userId
    );
    return NextResponse.json(updateService, { status: 201 });
  } catch (error: unknown) {
    console.error("Error update service by id:", error);
    return NextResponse.json(
      {
        message: "Failed to update service.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params;
    const DeleteService = await serviceusecases.DeleteServices(serviceId);
    return NextResponse.json(DeleteService, { status: 201 });
  } catch (error: unknown) {
    console.error("Error delete service by id:", error);
    return NextResponse.json(
      {
        message: "Failed to delete service.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
