import { NextRequest,NextResponse } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { RestaurentMenuRepository } from "@/core/repositories/IRestaurentMenuRepository";
import { RestaurentUsecase } from "@/core/usecases/RestaurentMenu.usecase";
import { RestaurentMenuDto } from "@/core/dtos/RestaurentMenu.dto";

const serviceRepository = new ServicesRepository();
const restaurentMenuRepository = new RestaurentMenuRepository();
const restaurentusecase = new RestaurentUsecase(restaurentMenuRepository,serviceRepository);

export async function POST(
    request:NextRequest,
     { params }: { params: Promise<{ serviceId: string }> }
){
    try {
        const {serviceId} = await params; 
        const ResaturentData:RestaurentMenuDto= await request.json();
        const createMenu = await restaurentusecase.createRestaurentMenuUsecase(ResaturentData,serviceId);
        return NextResponse.json(createMenu,{status:201});

    } catch (error: unknown) {
    console.error("Error create service by id:", error);
    return NextResponse.json(
      {
        message: "Failed to create service.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

export async function PUT(
    request:NextRequest,
     { params }: { params: Promise<{ serviceId: string }> }
) {
    try {
        const {serviceId} =await params;
        const RestaurentData:RestaurentMenuDto = await request.json();
        const updateMenu = await restaurentusecase.updateRestaurentMenuUsecase(RestaurentData,serviceId);
        return NextResponse.json(updateMenu,{status:201});
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

export async function GET(
    request:NextRequest,
   { params }: { params: Promise<{ serviceId: string }> }
) {
    try {
        const {serviceId} = await params;
        const getMenu = await restaurentusecase.findRestaurentMenubyServiceIdusecase(serviceId);
        return NextResponse.json(getMenu,{status:201});
    } catch (error: unknown) {
    console.error("Error get service by id:", error);
    return NextResponse.json(
      {
        message: "Failed to get service.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}