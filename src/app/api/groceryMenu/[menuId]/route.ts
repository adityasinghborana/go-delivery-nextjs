import { NextRequest,NextResponse } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { GroceryMenuRepository } from "@/core/repositories/IGroceryMenuRepository";
import { GroceryUSecase } from "@/core/usecases/GroceryMenu.usecase";

const serviceRepository = new ServicesRepository();
const groceryRepository = new GroceryMenuRepository();
const groceryusecases = new GroceryUSecase(groceryRepository,serviceRepository);

export async function GET(
    request:NextRequest,
   { params }: { params: Promise<{ menuId: string }> }
) {
    try {
        const {menuId} = await params;
        const getMenu = await groceryusecases.findByIdGroceryUsecase(menuId);
        return NextResponse.json(getMenu,{status:201});
    } catch (error: unknown) {
    console.error("Error get grocery by id:", error);
    return NextResponse.json(
      {
        message: "Failed to get grocery.",
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
        await groceryusecases.DeleteGroceryUSecase(menuId);
        return new NextResponse(null, { status: 204 });

    } catch (error: unknown) {
        console.error("Error deleting Grocery menu by id:", error);
        return NextResponse.json(
            {
                message: "Failed to delete menu.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}