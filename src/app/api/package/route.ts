import { UserRepository } from "@/core/repositories/IUserRepository";
import { PackageRepository } from "@/core/repositories/IPackageRepository";
import { PackageUsecase } from "@/core/usecases/Package.usecase";
import { NextRequest, NextResponse } from "next/server";
 const userRepository = new UserRepository();
 const packageRepository = new PackageRepository();
 const packageUsecase = new PackageUsecase(packageRepository,userRepository)

 export async function GET(
    request:NextRequest,
 ) {
    try {
        const getAllPackage = await packageUsecase.getAllPackageUsecase();
        return NextResponse.json(getAllPackage,{status:201});
    }catch (error: unknown) {
        console.error("Error getAll package by id:", error);
        return NextResponse.json(
        {
            message: "Failed to getAll package",
            error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
        );
  }
 }