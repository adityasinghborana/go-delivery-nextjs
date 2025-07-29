export interface GroceryMenuDto {
  name: string;
  serviceId: string;
  submenuItems: GrocerySubMenuDto[];
  itemCount: number;
}
export interface GrocerySubMenuDto{
      id?:string;
      name:string;
      menuId?:string;
      menuItems:GroceryMenuItemDto[];
}
export interface GroceryMenuItemDto{
        id?:string;
      name: string;
      weight:GroceryItemWeightDto[];
      imageUrl: string;
      additionalImages:string[]
      isPopular: boolean;
      isVegetarian: boolean;
      isAvalable: boolean;
      submenuId?: string;
}
export interface GroceryItemWeightDto{
    id?:string;
    price:number;
    sellPrice:number;
    weight:number;
    menuItemId:string;
}