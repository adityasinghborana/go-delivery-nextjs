import { NextRequest, NextResponse } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { CategoryRepository } from "@/core/repositories/ICategoryRepository";
import { ServiceUsecase } from "@/core/usecases/Services.usecase";
const serviceRepository = new ServicesRepository();
const categoryRepository = new CategoryRepository();
const serviceusecases = new ServiceUsecase(
  serviceRepository,
  categoryRepository
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await serviceusecases.findByCategoryServiceUseCase(id);
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
