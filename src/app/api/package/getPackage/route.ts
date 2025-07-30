import { UserRepository } from "@/core/repositories/IUserRepository";
import { PackageRepository } from "@/core/repositories/IPackageRepository";
import { PackageUsecase } from "@/core/usecases/Package.usecase";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
 const userRepository = new UserRepository();
 const packageRepository = new PackageRepository();
 
 const packageUsecase = new PackageUsecase(packageRepository,userRepository);
 export async function GET(
     request:NextRequest
  ) {
     try {
         const userId = await getUserIdFromRequest(request);
         const getPackageUSerId = await packageUsecase.getAllPackageByUserIdusecase(userId);
         return NextResponse.json(getPackageUSerId,{status:201});
     } catch (error: unknown) {
          console.error("Error get package by id:", error);
          return NextResponse.json(
          {
              message: "Failed to get package",
              error: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 }
          );
    }
  }