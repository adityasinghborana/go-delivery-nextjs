import { servicesDto } from "../dtos/Services.dto";
import { servicesEntity } from "../entities/Services.entity";
import prisma from "@/lib/prisma";

export interface IServiceRepository {
  createService(data: servicesDto): Promise<servicesEntity>;
  updateService(id: string, data: servicesDto): Promise<servicesEntity>;
  findServiceById(id: string): Promise<servicesEntity>;
  findAllServices(): Promise<servicesEntity[]>;
  findByCategory(categoryId: string): Promise<servicesEntity[]>;
  searchByName(query: string): Promise<servicesEntity[]>;
  searchByNameInCategory(
    query: string,
    categoryId: string
  ): Promise<servicesEntity[]>;
  //   findNear(
  //     latitude: number,
  //     longitude: number,
  //     maxDistance: number,
  //     categoryId: string
  //   ): Promise<servicesEntity[]>;    // we will do in the future
  count(categoryId?: string): Promise<number>;
  deleteServices(id: string): Promise<void>;
}

export class ServicesRepository implements IServiceRepository {
  async findAllServices(): Promise<servicesEntity[]> {
    const services = await prisma.services.findMany({
      where: {
        isActive: true,
      },
      include: {
        additionalImages: true,
      },
    });
    return services as servicesEntity[];
  }

  async findServiceById(id: string): Promise<servicesEntity> {
    const services = await prisma.services.findUnique({
      where: { id },
      include: {
        additionalImages: true,
        category: true,
        menus: true,
        orders: true,
      },
    });
    return services as servicesEntity;
  }

  async findByCategory(categoryId: string): Promise<servicesEntity[]> {
    const services = await prisma.services.findMany({
      where: { categoryId },
      include: {
        category: true,
        menus: true,
        orders: true,
        additionalImages: true,
      },
    });
    return services as servicesEntity[];
  }
  async createService(data: servicesDto): Promise<servicesEntity> {
    const { additionalImages, categoryId, ownerId, ...otherServiceData } = data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataForPrisma: any = {
      ...otherServiceData, // Spreads all simple fields like name, address, etc.

      owner: {
        connect: {
          id: ownerId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    };
    if (additionalImages && additionalImages.length > 0) {
      dataForPrisma.additionalImages = {
        create: additionalImages.map((image) => ({ url: image.url })),
      };
    }
    const newService = await prisma.services.create({
      data: dataForPrisma,
      include: {
        additionalImages: true,
      },
    });
    return newService as servicesEntity;
  }

  async updateService(id: string, data: servicesDto): Promise<servicesEntity> {
    const { additionalImages, ...otherUpdateData } = data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataForPrisma: any = {
      ...otherUpdateData,
    };
    if (additionalImages !== undefined) {
      dataForPrisma.additionalImages = {
        set: additionalImages.map((image) => ({ url: image.url })),
      };
    }
    const updateService = await prisma.services.update({
      where: { id },
      data: dataForPrisma,
      include: {
        additionalImages: true,
      },
    });
    return updateService as servicesEntity;
  }
  async searchByName(query: string): Promise<servicesEntity[]> {
    const service = await prisma.services.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
        additionalImages: true,
      },
    });
    return service as servicesEntity[];
  }
  async searchByNameInCategory(
    query: string,
    categoryId: string
  ): Promise<servicesEntity[]> {
    const services = await prisma.services.findMany({
      where: {
        categoryId,
        name: {
          contains: query,
        },
      },
      include: {
        category: true,
        additionalImages: true,
      },
    });
    return services as servicesEntity[];
  }
  async count(categoryId?: string): Promise<number> {
    const totalservices = await prisma.services.count({
      where: { categoryId },
    });
    return totalservices;
  }
  async deleteServices(id: string): Promise<void> {
    await prisma.services.delete({
      where: { id },
    });
  }
}
