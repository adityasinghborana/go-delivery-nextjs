export interface PharmaceuticalMenuDto {
  name: string;
  serviceId: string;
  submenuItems: PharmaceuticalSubMenuDto[];
  itemCount: number;
}
export interface PharmaceuticalSubMenuDto{
      id?:string;
      name:string;
      menuId?:string;
      menuItems:PharmaceuticalMenuItemDto[];
}
export interface PharmaceuticalMenuItemDto{
        id?:string;
      name: string;
      weight:PharmaceuticalItemWeightDto[];
      imageUrl: string;
      additionalImages:string[]
      isPopular: boolean;
      isVegetarian: boolean;
      isAvalable: boolean;
      submenuId?: string;
}
export interface PharmaceuticalItemWeightDto{
    id?:string;
    price:number;
    sellPrice:number;
    weight:number;
    menuItemId:string;
}