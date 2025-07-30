import { UserRepository } from "@/core/repositories/IUserRepository";
import { PackageRepository } from "@/core/repositories/IPackageRepository";
import { PackageDto } from "@/core/dtos/Package.dto";
import { PackageUsecase } from "@/core/usecases/Package.usecase";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
 const userRepository = new UserRepository();
 const packageRepository = new PackageRepository();
 
 const packageUsecase = new PackageUsecase(packageRepository,userRepository)
export async function POST(
    request:NextRequest,
    {params}:{params:Promise<{id:string}>}
) {
    try {
        const {id} = await params;
        const packageData :PackageDto = await request.json();
        const userId = await getUserIdFromRequest(request);
        const createPackage = await packageUsecase.createPackageUsecase(packageData,userId,id);
        return NextResponse.json(createPackage,{status:201});
    } catch (error: unknown) {
        console.error("Error create package by id:", error);
        return NextResponse.json(
        {
            message: "Failed to create package",
            error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
        );
  }
}