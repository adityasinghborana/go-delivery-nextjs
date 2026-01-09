import { NextRequest,NextResponse } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { RestaurentMenuRepository } from "@/core/repositories/IRestaurentMenuRepository";
import { RestaurentUsecase } from "@/core/usecases/RestaurentMenu.usecase";
const serviceRepository = new ServicesRepository();
const restaurentMenuRepository = new RestaurentMenuRepository();
const restaurentusecase = new RestaurentUsecase(restaurentMenuRepository,serviceRepository);

export async function GET(
    request:NextRequest,
   { params }: { params: Promise<{ menuId: string }> }
) {
    try {
        const {menuId} = await params;
        const getMenu = await restaurentusecase.findRestaurentMenuByIdUsecase(menuId);
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


export async function DELETE(
    request: Request,
      { params }: { params: Promise<{ menuId: string }> }
) {
    try {
         const { menuId } = await params;

        await restaurentusecase.deleteRestaurentMenu(menuId);
        return new NextResponse(null, { status: 204 });

    } catch (error: unknown) {
        console.error("Error deleting RestaurentMenu by id:", error);
        return NextResponse.json(
            {
                message: "Failed to delete menu.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
