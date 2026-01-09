export interface AddressDto {
  type: "HOME" | "WORK" | "OTHER";
  userId: string;
  fullAddress: string;
  houseNumber: string;
  landMark?: string;
  postalCode: string;
  directionText?: string;
  latitude: number;
  longitude: number;
}
