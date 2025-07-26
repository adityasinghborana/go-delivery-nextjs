export interface PhotoDto {
  url: string;
  restaurantId: string;
}
export interface servicesDto {
  name: string;
  categoryId: string;
  mainImageUrl?: string;
  additionalImages?: PhotoDto[];
  address?: string;
  latitude: number;
  longitude: number;
  cuisineType: string[];
  estimatedDeliveryTime: string;
  deliveryFee: number;
  minOrderValue?: number;
  openingTime?: string;
  closingTime?: string;
  allowsDelivery?: boolean;
  allowsPickup?: boolean;
  allowsDineIn?: boolean;
  hasOffer?: boolean;
  offerBannerText?: string;
  isVegetarianOnly?: boolean;
  isActive?: boolean;
  ownerId: string;
}
