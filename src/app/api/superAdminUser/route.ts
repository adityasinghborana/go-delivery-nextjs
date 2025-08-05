import { NextResponse, NextRequest } from "next/server";
import { SuperAdminUserRepository } from "@/core/repositories/ISuperAdminUserRepository";
import { superAdminDtoUser } from "@/core/dtos/superAdmin.dto";
import { SuperAdminUserUseCase } from "@/core/usecases/SuperAdminUser.usecase";
const superadminUserRepo = new SuperAdminUserRepository();
const superAdminusecase = new SuperAdminUserUseCase(superadminUserRepo);

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split("Bearer ")[1];
    console.log(token);
    if (!token) {
      return NextResponse.json(
        { message: "UnAuthorized - token" },
        { status: 401 }
      );
    }
    const data: superAdminDtoUser = await request.json();
    const newSuperAdminUSer = await superAdminusecase.createNewUser(
      data,
      token
    );
    return NextResponse.json(newSuperAdminUSer, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create super admin user." },
      { status: 500 }
    );
  }
}
