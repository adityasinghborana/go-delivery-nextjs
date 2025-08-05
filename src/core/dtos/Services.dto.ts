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
  verificationDocument: verifactionDocumentDto;
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
export interface verifactionDocumentDto {
  serviceLicenceNumber: string;
  panCard: string;
  GSTINCertificate?: string;
  AccountHolderName: string;
  AccountNumber: string;
  IFSCCode: string;
  ProofOfOwnerShip?: string;
  OwnerGovernmentIssueId: string;
  OwnerImage: string;
}
