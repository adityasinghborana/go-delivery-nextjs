import { NextRequest,NextResponse } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { PharmaceuticalMenuDto } from "@/core/dtos/PharmaceuticalMenu.dto";
import { PharmaceuticalMenuRepository } from "@/core/repositories/IPharmaMenuRepository";
import { Pharmaceuticalusecase } from "@/core/usecases/Pharmaceutical.usecase";
const serviceRepository = new ServicesRepository();
const pharmaceuticalMenuRespository = new PharmaceuticalMenuRepository();
const pharmaceuticalMenuusecase = new Pharmaceuticalusecase(pharmaceuticalMenuRespository,serviceRepository);
export async function POST(
    request:NextRequest,
     { params }: { params: Promise<{ serviceId: string }> }
){
    try {
        const {serviceId} = await params; 
        const pharmaceuticalData:PharmaceuticalMenuDto= await request.json();
        const createMenu = await pharmaceuticalMenuusecase.createpharmaceuticalusecase(pharmaceuticalData,serviceId);
        return NextResponse.json(createMenu,{status:201});

    } catch (error: unknown) {
    console.error("Error create GroceryMenu by id:", error);
    return NextResponse.json(
      {
        message: "Failed to create GroceryMenu",
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
        const pharmaceuticalData:PharmaceuticalMenuDto = await request.json();
        const updateMenu = await pharmaceuticalMenuusecase.updatepharmaceuticalMenuuseCase(pharmaceuticalData,serviceId);
        return NextResponse.json(updateMenu,{status:201});
    } catch (error: unknown) {
    console.error("Error update pharmaceuticalData by id:", error);
    return NextResponse.json(
      {
        message: "Failed to pharmaceuticalData Grocery.",
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
        const getMenu = await pharmaceuticalMenuusecase.findByServiceIdpharmaceuticalUsecase(serviceId);
        return NextResponse.json(getMenu,{status:201});
    } catch (error: unknown) {
    console.error("Error get Grocery by id:", error);
    return NextResponse.json(
      {
        message: "Failed to get Grocery.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}