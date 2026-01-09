import { PharmaceuticalMenuDto } from "../dtos/PharmaceuticalMenu.dto";
import { PharmaceuticalMenuEntity } from "../entities/PharmaceuticalMenu.entity";
import prisma from "@/lib/prisma";
export interface IPharmaceuticalMenuRepository {
  create(
    data: PharmaceuticalMenuDto,
    serviceId: string
  ): Promise<PharmaceuticalMenuEntity>;
  update(
    data: PharmaceuticalMenuDto,
    serviceId: string
  ): Promise<PharmaceuticalMenuEntity>;
  findByServiceId(serviceId: string): Promise<PharmaceuticalMenuEntity | null>;
  delete(id: string): Promise<void>;
  findbyId(id: string): Promise<PharmaceuticalMenuEntity | null>;
}

export class PharmaceuticalMenuRepository implements IPharmaceuticalMenuRepository{

    async create(data: PharmaceuticalMenuDto, serviceId: string): Promise<PharmaceuticalMenuEntity> {
        const createMenu = await prisma.pharmaceuticalMenu.create({
            data:{
                name:data.name,
                serviceId:serviceId,
                itemCount:data.itemCount,
                submenuItems:{
                    create:data.submenuItems.map((submenu)=>({
                        name:submenu.name,
                        menuItems:{
                            create:submenu.menuItems.map((menuitem)=>({
                                name:menuitem.name,
                                imageUrl:menuitem.imageUrl,
                                additionalImages:menuitem.additionalImages,
                                isPopular:menuitem.isPopular,
                                isVegetarian:menuitem.isVegetarian,
                                isAvailable:menuitem.isAvalable,
                                weight:{
                                    create:menuitem.weight.map((data)=>({
                                        price:data.price,
                                        sellPrice:data.sellPrice,
                                        weight:data.weight
                                    }))
                                }
                            }))
                        }
                    }))
                }
            },
            include:{
                submenuItems:{
                    include:{
                        menuItems:{
                            include:{
                                weight:true,
                            }
                        }
                    }
                }
            }
        });
        return createMenu as unknown as PharmaceuticalMenuEntity;
    }
    async update(data:Partial<PharmaceuticalMenuDto>, serviceId: string): Promise<PharmaceuticalMenuEntity> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataToUpdate:any = {name:data.name}
        if(data.submenuItems){
            dataToUpdate.itemCount = data.itemCount;
            const submenusToUpdate =data.submenuItems.filter(subMenu=>subMenu.id);
            const submenuTocreate = data.submenuItems.filter(subMenu=>!subMenu.id);
            dataToUpdate.submenuItems={
                update:submenusToUpdate.map(subMenu=>({
                    where:{id:subMenu.id!},
                    data:{
                        name:subMenu.name,
                        menuItems:{
                            deleteMany:{},
                            create:subMenu.menuItems.map((menuitem)=>({
                               name:menuitem.name,
                                imageUrl:menuitem.imageUrl,
                                additionalImages:menuitem.additionalImages,
                                isPopular:menuitem.isPopular,
                                isVegetarian:menuitem.isVegetarian,
                                isAvailable:menuitem.isAvalable,
                                weight:{
                                    create:menuitem.weight.map((data)=>({
                                        price:data.price,
                                        sellPrice:data.sellPrice,
                                        weight:data.weight
                                    }))
                                }
                            }))
                        }
                    }
                })),
                create:submenuTocreate.map(submenu=>({
                    name:submenu.name,
                    menuItems:{
                        create:submenu.menuItems.map((menuitem)=>({
                            name:menuitem.name,
                                imageUrl:menuitem.imageUrl,
                                additionalImages:menuitem.additionalImages,
                                isPopular:menuitem.isPopular,
                                isVegetarian:menuitem.isVegetarian,
                                isAvailable:menuitem.isAvalable,
                                weight:{
                                    create:menuitem.weight.map((data)=>({
                                        price:data.price,
                                        sellPrice:data.sellPrice,
                                        weight:data.weight
                                    }))
                                }
                        }))
                    }
                }))
            }
        }
        const updateMenu = await prisma.pharmaceuticalMenu.update({
            where:{serviceId:serviceId},
            data:dataToUpdate,
            include:{
                submenuItems:{
                    include:{
                        menuItems:{
                            include:{
                                weight:true,
                            }
                        }
                    }
                }
            }
        });
        return updateMenu as unknown as PharmaceuticalMenuEntity;
    }
    async findByServiceId(serviceId: string): Promise<PharmaceuticalMenuEntity | null> {
        const menu = await prisma.pharmaceuticalMenu.findFirst({
            where:{serviceId:serviceId},
             include:{
                submenuItems:{
                    include:{
                        menuItems:{
                            include:{
                                weight:true,
                            }
                        }
                    }
                }
            }
        })
        return menu as PharmaceuticalMenuEntity | null;
    }
    async findbyId(id: string): Promise<PharmaceuticalMenuEntity | null> {
        const menu = await prisma.pharmaceuticalMenu.findFirst({
            where:{id},
             include:{
                submenuItems:{
                    include:{
                        menuItems:{
                            include:{
                                weight:true,
                            }
                        }
                    }
                }
            }
        });
        return menu as PharmaceuticalMenuEntity | null;
    }

    async delete(id: string): Promise<void> {
        await prisma.pharmaceuticalMenu.delete({
            where:{id}
        });
    }
}