import { CategoryDTO } from "../dtos/Category.dto";
import { CategoryEntity } from "../entities/Category.entity";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
export class CategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}
  async createCategoryUsecase(data: CategoryDTO): Promise<CategoryEntity> {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Category name is required.");
    }
    if (data.imageUrl && typeof data.imageUrl !== "string") {
      throw new Error("Image URL must be a string.");
    }
    const newCateogory = await this.categoryRepository.create(data);
    return newCateogory;
  }

  async updateCategoryUsecase(
    id: string,
    data: CategoryDTO
  ): Promise<CategoryEntity> {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Category name is required.");
    }
    if (data.imageUrl && typeof data.imageUrl !== "string") {
      throw new Error("Image URL must be a string.");
    }
    return this.categoryRepository.update(id, data);
  }
  async findAllCategoryUsecase(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
  async findByIdCategoryUsecase(id: string): Promise<CategoryEntity | null> {
    const category = await this.categoryRepository.findById(id);
    return category;
  }
  async deleteCategoryUsecase(id: string): Promise<boolean> {
    await this.categoryRepository.delete(id);
    return true;
  }
}
