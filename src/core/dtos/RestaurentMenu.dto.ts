export interface RestaurentMenuDto {
  name: string;
  serviceId: string;
  submenuItems: RestaurentSubMenuDto[];
  itemCount: number;
}
export interface RestaurentSubMenuDto{
  id?:string;
  name:string;
  menuId?:string;
  menuItems:RestaurentMenuItemDto[];
}
export interface RestaurentMenuItemDto {
  id?:string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isPopular: boolean;
  isVegetarian: boolean;
  isAvalable: boolean;
  menuId?: string;
  addonGroups: AddOnGroupDto[];
}
export interface AddOnGroupDto {
  id?:string;
  name: string;
  minSelection: number;
  maxSelection: number;
  menuItemId?: string;
  addons: AddonDto[];
}
export interface AddonDto {
  id?:string;
  name: string;
  price: number;
  addOnGroupId?: string;
}
