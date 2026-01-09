export interface CartDto {
  serviceId: string;
  items: CartItemDto[];
  TotalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CartItemDto {
  itemId: string;
  price: number;
  quantity: number;

  addOnName?: string | undefined;
  addOnPrice?: number | undefined;
}
export interface UpdateQuantityDto {
  quantity: number;
}
