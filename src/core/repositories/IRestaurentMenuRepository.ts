import { RestaurentMenuDto } from "../dtos/RestaurentMenu.dto";
import { RestaurentMenuEntity } from "../entities/RestaurentMenu.entity";
import prisma from "@/lib/prisma";

export interface IRestaurentMenuRepository {
  create(
    data: RestaurentMenuDto,
    serviceId: string
  ): Promise<RestaurentMenuEntity>;
  update(
    data: RestaurentMenuDto,
    serviceId: string
  ): Promise<RestaurentMenuEntity>;
  findByServiceId(serviceId: string): Promise<RestaurentMenuEntity | null>;
  delete(id: string): Promise<void>;
  findbyId(id: string): Promise<RestaurentMenuEntity | null>;
}

export class RestaurentMenuRepository implements IRestaurentMenuRepository {
  async findByServiceId(
    serviceId: string
  ): Promise<RestaurentMenuEntity | null> {
    const Menu = await prisma.restaurentMenu.findFirst({
      where: { serviceId },
      include: {
        menuItems: {
          include: {
            addonGroups: {
              include: {
                addons: true,
              },
            },
          },
        },
      },
    });
    return Menu as RestaurentMenuEntity | null;
  }
  async findbyId(id: string): Promise<RestaurentMenuEntity | null> {
    const Menu = await prisma.restaurentMenu.findFirst({
      where: { id },
      include: {
        menuItems: {
          include: {
            addonGroups: {
              include: {
                addons: true,
              },
            },
          },
        },
      },
    });
    return Menu as RestaurentMenuEntity | null;
  }
  async create(
    data: RestaurentMenuDto,
    serviceId: string
  ): Promise<RestaurentMenuEntity> {
    const createMenu = await prisma.restaurentMenu.create({
      data: {
        name: data.name,
        serviceId: serviceId,
        itemCount: data.itemCount,
        menuItems: {
          create: data.menuItems.map((item) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
            isPopular: item.isPopular,
            isVegetarian: item.isVegetarian,
            isAvailable: item.isAvalable,
            addonGroups: {
              create: item.addonGroups.map((item) => ({
                name: item.name,
                minSelection: item.minSelection,
                maxSelection: item.maxSelection,
                addOns: {
                  create: item.addons.map((item) => ({
                    name: item.name,
                    price: item.price,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        menuItems: {
          include: {
            addonGroups: {
              include: {
                addons: true,
              },
            },
          },
        },
      },
    });
    return createMenu as unknown as RestaurentMenuEntity;
  }
  async update(
    data: RestaurentMenuDto,
    serviceId: string
  ): Promise<RestaurentMenuEntity> {
    const updatedMenu = await prisma.restaurentMenu.update({
      where: {
        serviceId: serviceId,
      },
      data: {
        name: data.name,
        itemCount: data.itemCount,
        menuItems: {
          create: data.menuItems.map((menuItem) => ({
            name: menuItem.name,
            description: menuItem.description,
            price: menuItem.price,
            imageUrl: menuItem.imageUrl,
            isPopular: menuItem.isPopular,
            isVegetarian: menuItem.isVegetarian,
            isAvailable: menuItem.isAvalable,
            addonGroups: {
              create: menuItem.addonGroups?.map((group) => ({
                name: group.name,
                minSelection: group.minSelection,
                maxSelection: group.maxSelection,
                addons: {
                  create: group.addons?.map((addon) => ({
                    name: addon.name,
                    price: addon.price,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        menuItems: {
          include: {
            addonGroups: {
              include: {
                addons: true,
              },
            },
          },
        },
      },
    });

    return updatedMenu as unknown as RestaurentMenuEntity;
  }
  async delete(id: string): Promise<void> {
    await prisma.restaurentMenu.delete({
      where: { id },
    });
  }
}
