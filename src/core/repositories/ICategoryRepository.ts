import { CategoryDTO } from "../dtos/Category.dto";
import { CategoryEntity } from "../entities/Category.entity";
import prisma from "@/lib/prisma";

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[]>;
  findById(id: number): Promise<CategoryEntity | null>;
  create(categoryData: CategoryDTO): Promise<CategoryEntity>;
  update(id: number, categoryData: CategoryDTO): Promise<CategoryEntity>;
  delete(id: number): Promise<void>;
}
export class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<CategoryEntity[]> {
    const categories = await prisma.category.findMany({});
    return categories;
  }
  async findById(id: number): Promise<CategoryEntity | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  }
  async create(categoryData: CategoryDTO): Promise<CategoryEntity> {
    const newCategory = await prisma.category.create({
      data: {
        name: categoryData.name,
        imageUrl: categoryData.imageUrl,
        description: categoryData.description,
        color: categoryData.color,
      },
    });
    return newCategory;
  }
  async update(id: number, categoryData: CategoryDTO): Promise<CategoryEntity> {
    const updateCategory = await prisma.category.update({
      where: { id },
      data: {
        name: categoryData.name !== undefined ? categoryData.name : undefined,
        imageUrl:
          categoryData.imageUrl !== undefined
            ? categoryData.imageUrl
            : undefined,
        description:
          categoryData.description !== undefined
            ? categoryData.description
            : undefined,
        color:
          categoryData.color !== undefined ? categoryData.color : undefined,
      },
    });
    return updateCategory;
  }
  async delete(id: number): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }
}
