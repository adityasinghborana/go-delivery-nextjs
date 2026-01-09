export interface RestaurentMenuEntity {
  id: string;
  name: string;
  serviceId: string;
  submenuItems: RestaurentSubMenuEntity[];
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface RestaurentSubMenuEntity{
  id:string;
  name:string;
  menuId?:string;
  menuItems:RestaurentMenuItemEntity[];
  createdAt: Date;
  updatedAt: Date;
}
export interface RestaurentMenuItemEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isPopular: boolean;
  isVegetarian: boolean;
  isAvalable: boolean;
  menuId?: string;
  addonGroups: AddOnGroupEntity[];
  createdAt: Date;
  updatedAt: Date;
}
export interface AddOnGroupEntity {
  id: string;
  name: string;
  minSelection: number;
  maxSelection: number;
  menuItemId?: string;
  addons: AddonEntity[];
  createdAt: Date;
  updatedAt: Date;
}
export interface AddonEntity {
  id: string;
  name: string;
  price: number;
  addOnGroupId?: string;
  createdAt: Date;
  updatedAt: Date;
}
