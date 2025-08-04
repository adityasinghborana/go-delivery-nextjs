import { ServiceStatusRepository } from "@/core/repositories/IServiceStatusRepository";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { ServiceStatusUsecase } from "@/core/usecases/ServiceStatus.usecase";
import { NextRequest, NextResponse } from "next/server";
import { ServiceStatusDto } from "@/core/dtos/ServiceStatus.dto";
const serviceRepository = new ServicesRepository();
const serviceStatusRepository = new ServiceStatusRepository();
const serviceStatususecase = new ServiceStatusUsecase(
  serviceStatusRepository,
  serviceRepository
);
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params;
    const data: ServiceStatusDto = await request.json();
    const statusUSeCase = await serviceStatususecase.updateServiceStatusUsecase(
      data,
      serviceId
    );
    return NextResponse.json(statusUSeCase, { status: 201 });
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
