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
        submenuItems: {
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
        },
      },
    });
    return Menu as RestaurentMenuEntity | null;
  }
  async findbyId(id: string): Promise<RestaurentMenuEntity | null> {
    const Menu = await prisma.restaurentMenu.findFirst({
      where: { id },
      include: {
        submenuItems: {
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
        submenuItems: {
          create: data.submenuItems.map((submenu) => ({
            name: submenu.name,
            menuItems: {
              create: submenu.menuItems.map((menuItem) => ({
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
          })),
        },
      },
      include: {
        submenuItems: {
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
        },
      },
    });
    return createMenu as unknown as RestaurentMenuEntity;
  }
  async update(
    data: Partial<RestaurentMenuDto>,
    serviceId: string
): Promise<RestaurentMenuEntity> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToUpdate: any = { name: data.name };
    if (data.submenuItems) {
        dataToUpdate.itemCount = data.itemCount;
        const submenusToUpdate = data.submenuItems.filter(submenu => submenu.id);
        const submenusToCreate = data.submenuItems.filter(submenu => !submenu.id);

        dataToUpdate.submenuItems = {
            update: submenusToUpdate.map(submenu => ({
                where: { id: submenu.id! },
                data: {
                    name: submenu.name,
                    menuItems: {
                        deleteMany: {},
                        create: submenu.menuItems.map((menuItem) => ({
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
                    }
                }
            })),
            
            create: submenusToCreate.map(submenu => ({
                name: submenu.name,
                menuItems: {
                    create: submenu.menuItems.map((menuItem) => ({
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
                }
            }))
        };
    }

    const updatedMenu = await prisma.restaurentMenu.update({
      where: {
        serviceId: serviceId,
      },
      data: dataToUpdate,
      include: {
        submenuItems: {
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
