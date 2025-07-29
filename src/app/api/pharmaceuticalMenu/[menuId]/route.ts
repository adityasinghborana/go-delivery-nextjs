import { NextRequest,NextResponse } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { PharmaceuticalMenuDto } from "@/core/dtos/PharmaceuticalMenu.dto";
import { PharmaceuticalMenuRepository } from "@/core/repositories/IPharmaMenuRepository";
import { Pharmaceuticalusecase } from "@/core/usecases/Pharmaceutical.usecase";
const serviceRepository = new ServicesRepository();
const pharmaceuticalMenuRespository = new PharmaceuticalMenuRepository();
const pharmaceuticalMenuusecase = new Pharmaceuticalusecase(pharmaceuticalMenuRespository,serviceRepository);
export async function GET(
    request:NextRequest,
   { params }: { params: Promise<{ menuId: string }> }
) {
    try {
        const {menuId} = await params;
        const getMenu = await pharmaceuticalMenuusecase.findByIdpharmaceuticalUsecase(menuId);
        return NextResponse.json(getMenu,{status:201});
    } catch (error: unknown) {
    console.error("Error get pharmaceutical by id:", error);
    return NextResponse.json(
      {
        message: "Failed to get pharmaceutical.",
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
        await pharmaceuticalMenuusecase.DeletepharmaceuticalUSecase(menuId);
        return new NextResponse(null, { status: 204 });

    } catch (error: unknown) {
        console.error("Error deleting pharmaceutical menu by id:", error);
        return NextResponse.json(
            {
                message: "Failed to delete menu.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}