import { UserRepository } from "@/core/repositories/IUserRepository";
import { PackageRepository } from "@/core/repositories/IPackageRepository";
import { PackageDto } from "@/core/dtos/Package.dto";
import { PackageUsecase } from "@/core/usecases/Package.usecase";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
 const userRepository = new UserRepository();
 const packageRepository = new PackageRepository();
 
 const packageUsecase = new PackageUsecase(packageRepository,userRepository);
 export async function PUT(
     request:NextRequest,
     {params}:{params:Promise<{packageId:string}>}
 ) {
     try {
         const {packageId} = await params;
         const packageData :PackageDto = await request.json();
         const userId = await getUserIdFromRequest(request);
         const createPackage = await packageUsecase.updatePackageUsecase(packageData,userId,packageId);
         return NextResponse.json(createPackage,{status:201});
     } catch (error: unknown) {
         console.error("Error update package by id:", error);
         return NextResponse.json(
         {
             message: "Failed to update package",
             error: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
         );
   }
 }
 
 export async function DELETE(
    request:NextRequest,
     {params}:{params:Promise<{packageId:string}>}
 ) {
    try {
        const {packageId} = await params;
        await packageUsecase.deletePackageUsecase(packageId);
        return  NextResponse.json(null,{status:201});
    }  catch (error: unknown) {
         console.error("Error delete package by id:", error);
         return NextResponse.json(
         {
             message: "Failed to delete package",
             error: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
         );
   }
 }