import { ServiceStatusDto } from "../dtos/ServiceStatus.dto";
import { servicesEntity } from "../entities/Services.entity";
import { IServicestatusRepository } from "../repositories/IServiceStatusRepository";
import { IServiceRepository } from "../repositories/IServiceRepository";

export class ServiceStatusUsecase {
  constructor(
    private servicestatusRepository: IServicestatusRepository,
    private serviceRepository: IServiceRepository
  ) {}
  async updateServiceStatusUsecase(
    data: ServiceStatusDto,
    restaurentId: string
  ): Promise<servicesEntity> {
    const existingService = await this.serviceRepository.findServiceById(
      restaurentId
    );
    if (!existingService) {
      throw new Error("this is not found please provide the currect serviceId");
    }
    const updateServiceusecase = await this.servicestatusRepository.update(
      data,
      restaurentId
    );
    return updateServiceusecase;
  }
}
