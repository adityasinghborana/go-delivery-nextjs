import { GroceryMenuDto } from "../dtos/GroceryMenu.dto";
import { GroceryMenuEntity } from "../entities/GroceryMenu.entity";
import prisma from "@/lib/prisma";
export interface IGroceryMenuRepository {
  create(
    data: GroceryMenuDto,
    serviceId: string
  ): Promise<GroceryMenuEntity>;
  update(
    data: GroceryMenuDto,
    serviceId: string
  ): Promise<GroceryMenuEntity>;
  findByServiceId(serviceId: string): Promise<GroceryMenuEntity | null>;
  delete(id: string): Promise<void>;
  findbyId(id: string): Promise<GroceryMenuEntity | null>;
}

export class GroceryMenuRepository implements IGroceryMenuRepository{

    async create(data: GroceryMenuDto, serviceId: string): Promise<GroceryMenuEntity> {
        const createMenu = await prisma.groceryMenu.create({
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
        return createMenu as unknown as GroceryMenuEntity;
    }
    async update(data:Partial<GroceryMenuDto>, serviceId: string): Promise<GroceryMenuEntity> {
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
        const updateMenu = await prisma.groceryMenu.update({
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
        return updateMenu as unknown as GroceryMenuEntity;
    }
    async findByServiceId(serviceId: string): Promise<GroceryMenuEntity | null> {
        const menu = await prisma.groceryMenu.findFirst({
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
        return menu as GroceryMenuEntity | null;
    }
    async findbyId(id: string): Promise<GroceryMenuEntity | null> {
        const menu = await prisma.groceryMenu.findFirst({
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
        return menu as GroceryMenuEntity | null;
    }

    async delete(id: string): Promise<void> {
        await prisma.groceryMenu.delete({
            where:{id}
        });
    }
}