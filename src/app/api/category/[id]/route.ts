import { NextResponse } from "next/server";
import { CategoryRepository } from "@/core/repositories/ICategoryRepository";
import { CategoryUsecase } from "@/core/usecases/Category.usecase";
import { CategoryDTO } from "@/core/dtos/Category.dto";

const categoryRepository = new CategoryRepository();
const categoryUsecase = new CategoryUsecase(categoryRepository);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid category ID format." },
        { status: 400 }
      );
    }

    const category = await categoryUsecase.findByIdCategoryUsecase(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching category by id:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch category.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid category ID format." },
        { status: 400 }
      );
    }

    const body: CategoryDTO = await request.json();
    const updatedCategory = await categoryUsecase.updateCategoryUsecase(
      id,
      body
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      {
        message: "Failed to update category.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid category ID format." },
        { status: 400 }
      );
    }

    const success = await categoryUsecase.deleteCategoryUsecase(id);

    if (!success) {
      return NextResponse.json(
        { message: "Category not found or could not be deleted." },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      {
        message: "Failed to delete category.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
