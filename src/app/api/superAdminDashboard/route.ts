import { NextResponse } from "next/server";
import { SuperAdminDashboardRepository } from "@/core/repositories/ISuperAdminDashBoardRepository";
import { SuperAdminDashboardUsecase } from "@/core/usecases/ISuperAdminDashBoard.usecase";
const superAdminRepo = new SuperAdminDashboardRepository();
const superAdminUsecase = new SuperAdminDashboardUsecase(superAdminRepo);
export async function GET() {
  try {
    const dashBoard = await superAdminUsecase.execute();
    return NextResponse.json(dashBoard, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 401 }
    );
  }
}
