import { ServiceStatusDto } from "../dtos/ServiceStatus.dto";
import { servicesEntity } from "../entities/Services.entity";
import prisma from "@/lib/prisma";

export interface IServicestatusRepository {
  update(data: ServiceStatusDto, restaurentId: string): Promise<servicesEntity>;
}
export class ServiceStatusRepository implements IServicestatusRepository {
  async update(
    data: ServiceStatusDto,
    restaurentId: string
  ): Promise<servicesEntity> {
    const updateStatus = await prisma.services.update({
      where: { id: restaurentId },
      data: {
        verificationStatus: data.verificationStatus,
        rejectionReason: data.rejectionReason,
        isActive: data.verificationStatus === "Approved" ? true : false,
      },
    });
    return updateStatus as unknown as servicesEntity;
  }
}
