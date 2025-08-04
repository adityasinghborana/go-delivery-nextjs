export interface PhotoEntity {
  id: string;
  url: string;
  serviceId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface servicesEntity {
  name: string;
  mainImageUrl: string;
  additionalImages: PhotoEntity[];
  address: string;
  latitude: number;
  longitude: number;
  categoryId: string;
  rating: number;
  ratingText: string;
  totalRatings: number;
  cuisineType: string[];
  estimatedDeliveryTime: string;
  deliveryFee: number;
  minOrderValue: number;
  openingTime: string;
  closingTime: string;
  allowsDelivery: boolean;
  allowsPickup: boolean;
  allowsDineIn: boolean;
  hasOffer: boolean;
  offerBannerText: string;
  isVegetarianOnly: boolean;
  isActive: boolean;
  verificationStatus: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}
