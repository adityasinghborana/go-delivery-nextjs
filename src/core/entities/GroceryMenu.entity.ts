export interface GroceryMenuEntity {
  id: string;
  name: string;
  serviceId: string;
  submenuItems: GrocerySubMenuEntity[];
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface GrocerySubMenuEntity{
  id:string;
  name:string;
  menuId?:string;
  menuItems:GroceryMenuItemEntity[];
  createdAt: Date;
  updatedAt: Date;
}
export interface GroceryMenuItemEntity {
  id: string;
  name: string;
  weight:GroceryItemWeightEntity[]
  imageUrl: string;
  additionalImages:string[]
  isPopular: boolean;
  isVegetarian: boolean;
  isAvalable: boolean;
  submenuId?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GroceryItemWeightEntity{
    id:string;
    price:number;
    sellPrice:number;
    weight:number;
    menuItemId:string;
    createdAt:Date;
    updatedAt:Date;
}