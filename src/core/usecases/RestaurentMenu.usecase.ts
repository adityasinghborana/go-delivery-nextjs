import { RestaurentMenuDto } from "../dtos/RestaurentMenu.dto";
import { RestaurentMenuEntity } from "../entities/RestaurentMenu.entity";
import { IRestaurentMenuRepository } from "../repositories/IRestaurentMenuRepository";
import { IServiceRepository } from "../repositories/IServiceRepository";

export class RestaurentUsecase {
  constructor(
    private restaurentRepository: IRestaurentMenuRepository,
    private serviceRepository: IServiceRepository
  ) {}
  async createRestaurentMenuUsecase(
    data: RestaurentMenuDto,
    serviceId: string
  ): Promise<RestaurentMenuEntity> {
    const existingService = await this.serviceRepository.findServiceById(
      serviceId
    );
    if (!existingService) {
      throw new Error("service id not found");
    }
    const createRestaurentMenu = await this.restaurentRepository.create(
      data,
      serviceId
    );
    return createRestaurentMenu;
  }
  async updateRestaurentMenuUsecase(
    data: RestaurentMenuDto,
    serviceId: string
  ): Promise<RestaurentMenuEntity> {
    const existingService = await this.serviceRepository.findServiceById(
      serviceId
    );
    if (!existingService) {
      throw new Error("service id not found");
    }
    const updateRestaurentMenu = await this.restaurentRepository.update(
      data,
      serviceId
    );
    return updateRestaurentMenu;
  }
  async findRestaurentMenubyServiceIdusecase(
    serviceId: string
  ): Promise<RestaurentMenuEntity | null> {
    const existingService = await this.serviceRepository.findServiceById(
      serviceId
    );
    if (!existingService) {
      throw new Error("service id not found");
    }
    const findByServiceId = await this.restaurentRepository.findByServiceId(
      serviceId
    );
    return findByServiceId;
  }
  async findRestaurentMenuByIdUsecase(
    id: string
  ): Promise<RestaurentMenuEntity | null> {
    if (!id) {
      throw new Error("id is required");
    }
    const findbyId = await this.restaurentRepository.findbyId(id);
    return findbyId;
  }
  async deleteRestaurentMenu(id: string): Promise<void> {
    await this.restaurentRepository.delete(id);
  }
}
