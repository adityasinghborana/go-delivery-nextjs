import { NextResponse } from "next/server";
import { CategoryRepository } from "@/core/repositories/ICategoryRepository";
import { CategoryUsecase } from "@/core/usecases/Category.usecase";
import { CategoryDTO } from "@/core/dtos/Category.dto";

const categoryRepository = new CategoryRepository();
const categoryUsecase = new CategoryUsecase(categoryRepository);
export async function GET() {
  try {
    const categories = await categoryUsecase.findAllCategoryUsecase();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching categories." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const categoryData: CategoryDTO = await request.json();

    const newCategory = await categoryUsecase.createCategoryUsecase(
      categoryData
    );

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create category." },
      { status: 500 }
    );
  }
}
