import { NextRequest,NextResponse } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { GroceryMenuRepository } from "@/core/repositories/IGroceryMenuRepository";
import { GroceryMenuDto } from "@/core/dtos/GroceryMenu.dto";
import { GroceryUSecase } from "@/core/usecases/GroceryMenu.usecase";

const serviceRepository = new ServicesRepository();
const groceryMenuRepository = new GroceryMenuRepository();
const groceryMenuusecase = new GroceryUSecase(groceryMenuRepository,serviceRepository);
export async function POST(
    request:NextRequest,
     { params }: { params: Promise<{ serviceId: string }> }
){
    try {
        const {serviceId} = await params; 
        const GroceryData:GroceryMenuDto= await request.json();
        const createMenu = await groceryMenuusecase.createGroceryusecase(GroceryData,serviceId);
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
        const GroceryData:GroceryMenuDto = await request.json();
        const updateMenu = await groceryMenuusecase.updateGroceryMenuuseCase(GroceryData,serviceId);
        return NextResponse.json(updateMenu,{status:201});
    } catch (error: unknown) {
    console.error("Error update Grocery by id:", error);
    return NextResponse.json(
      {
        message: "Failed to update Grocery.",
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
        const getMenu = await groceryMenuusecase.findByServiceIdGroceryUsecase(serviceId);
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