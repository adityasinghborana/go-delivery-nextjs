export interface AddressEntity {
  id: string;
  type: "HOME" | "WORK" | "OTHER";
  fullAddress: string;
  houseNumber: string;
  landMark?: string;
  postalCode: string;
  directionText?: string;
  latitude: number;
  longitude: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
