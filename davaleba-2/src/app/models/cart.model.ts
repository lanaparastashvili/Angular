export interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  material: string;
  seller: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}
