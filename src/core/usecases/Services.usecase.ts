import { servicesDto } from "../dtos/Services.dto";
import { servicesEntity } from "../entities/Services.entity";
import { IServiceRepository } from "../repositories/IServiceRepository";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
export class ServiceUsecase {
  constructor(
    private servicesRepository: IServiceRepository,
    private categoryRepository: ICategoryRepository
  ) {}
  async createServiceUsecase(
    data: servicesDto,
    ownerId: string
  ): Promise<servicesEntity> {
    const category = await this.categoryRepository.findById(data.categoryId);
    if (!category) {
      throw new Error("The selected category does not exist.");
    }
    const categoryName = category.name;
    const cleanedName = data.name.trim();
    const dataToSave = {
      ...data,
      name: cleanedName,
      ownerId: ownerId,
    };
    const newService = await this.servicesRepository.createService(
      dataToSave,
      categoryName
    );
    return newService;
  }
  async updateServiceUsecase(
    data: servicesDto,
    serviceId: string,
    userId: string
  ): Promise<servicesEntity> {
    const existingService = await this.servicesRepository.findServiceById(
      serviceId
    );
    if (!existingService) {
      throw new Error("Service no found");
    }
    if (existingService.ownerId !== userId) {
      throw new Error("You are not authorized to update this service.");
    }
    const updateService = await this.servicesRepository.updateService(
      serviceId,
      data
    );
    return updateService;
  }
  async findByServiceIdusecase(serviceId: string): Promise<servicesEntity> {
    if (!serviceId) {
      throw new Error("service id is not found");
    }
    const service = await this.servicesRepository.findServiceById(serviceId);
    return service;
  }
  async findAllServiceUsecase(): Promise<servicesEntity[]> {
    const allservices = await this.servicesRepository.findAllServices();
    return allservices;
  }
  async findByCategoryServiceUseCase(
    categoryId: string
  ): Promise<servicesEntity[]> {
    if (!categoryId) {
      throw new Error("Id no found");
    }
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error("Category not found.");
    }
    const services = await this.servicesRepository.findByCategory(categoryId);
    return services;
  }
  async searchByNameUsecase(query: string): Promise<servicesEntity[]> {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      return [];
    }
    const services = await this.servicesRepository.searchByName(trimmedQuery);
    return services;
  }
  async searchByNameInCategory(query: string, categoryId: string) {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error("Category not found.");
    }
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      return [];
    }
    const services = await this.servicesRepository.searchByNameInCategory(
      trimmedQuery,
      categoryId
    );
    return services;
  }
  async DeleteServices(serviceId: string): Promise<void> {
    await this.servicesRepository.deleteServices(serviceId);
  }
}
