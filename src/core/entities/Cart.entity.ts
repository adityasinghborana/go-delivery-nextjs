export interface CartEntity {
  id: string;
  userId: string;
  serviceId: string;
  TotalPrice: number;
  items: CartItemEntity[];
  createdAt: Date;
  updatedAt: Date;
}
export interface CartItemEntity {
  id: string;
  cartId: string;
  itemId: string;
  price: number;
  quantity: number;
  addOnName?: string | undefined;
  addOnPrice?: number | undefined;
  createdAt: Date;
  updatedAt: Date;
}
