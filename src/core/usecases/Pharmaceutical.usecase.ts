import { IPharmaceuticalMenuRepository } from "../repositories/IPharmaMenuRepository";
import { PharmaceuticalMenuDto } from "../dtos/PharmaceuticalMenu.dto";
import { PharmaceuticalMenuEntity } from "../entities/PharmaceuticalMenu.entity";
import { IServiceRepository } from "../repositories/IServiceRepository";
export class Pharmaceuticalusecase {
  constructor(
    private pharmaceuticalRepository: IPharmaceuticalMenuRepository,
    private serviceRepository: IServiceRepository
  ) {}
  async createpharmaceuticalusecase(
    data: PharmaceuticalMenuDto,
    serviceId: string
  ): Promise<PharmaceuticalMenuEntity> {
    const existingServiceId = await this.serviceRepository.findServiceById(
      serviceId
    );
    if (!existingServiceId) {
      throw new Error("service id not found");
    }
    const createMenu = await this.pharmaceuticalRepository.create(
      data,
      serviceId
    );
    return createMenu;
  }
  async updatepharmaceuticalMenuuseCase(
    data: PharmaceuticalMenuDto,
    serviceId: string
  ): Promise<PharmaceuticalMenuEntity> {
    const existingServiceId = await this.serviceRepository.findServiceById(
      serviceId
    );
    if (!existingServiceId) {
      throw new Error("service id not found");
    }
    const updateMenu = await this.pharmaceuticalRepository.update(
      data,
      serviceId
    );
    return updateMenu;
  }
  async findByServiceIdpharmaceuticalUsecase(
    serviceId: string
  ): Promise<PharmaceuticalMenuEntity | null> {
    const existingServiceId = await this.serviceRepository.findServiceById(
      serviceId
    );
    if (!existingServiceId) {
      throw new Error("service id not found");
    }
    const menu = await this.pharmaceuticalRepository.findByServiceId(serviceId);
    return menu;
  }
  async findByIdpharmaceuticalUsecase(
    id: string
  ): Promise<PharmaceuticalMenuEntity | null> {
    const menu = await this.pharmaceuticalRepository.findbyId(id);
    return menu;
  }
  async DeletepharmaceuticalUSecase(id: string): Promise<void> {
    const menu = await this.pharmaceuticalRepository.delete(id);
    return menu;
  }
}
