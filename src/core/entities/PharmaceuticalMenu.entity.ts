export interface PharmaceuticalMenuEntity {
  id: string;
  name: string;
  serviceId: string;
  submenuItems: PharmaceuticalSubMenuEntity[];
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface PharmaceuticalSubMenuEntity{
  id:string;
  name:string;
  menuId?:string;
  menuItems:PharmaceuticalMenuItemEntity[];
  createdAt: Date;
  updatedAt: Date;
}
export interface PharmaceuticalMenuItemEntity {
  id: string;
  name: string;
  weight:PharmaceuticalItemWeightEntity[]
  imageUrl: string;
  additionalImages:string[]
  isPopular: boolean;
  isVegetarian: boolean;
  isAvalable: boolean;
  submenuId?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PharmaceuticalItemWeightEntity{
    id:string;
    price:number;
    sellPrice:number;
    weight:number;
    menuItemId:string;
    createdAt:Date;
    updatedAt:Date;
}