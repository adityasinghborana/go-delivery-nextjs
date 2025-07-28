export interface RestaurentMenuDto {
  name: string;
  serviceId: string;
  menuItems: RestaurentMenuItemDto[];
  itemCount: number;
}
export interface RestaurentMenuItemDto {
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
  name: string;
  minSelection: number;
  maxSelection: number;
  menuItemId?: string;
  addons: AddonDto[];
}
export interface AddonDto {
  name: string;
  price: number;
  addOnGroupId?: string;
}
