export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
  imageUrl: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  product: Product;
}

export enum OrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled"
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: 'Stripe' | 'Razorpay';
  paymentId: string;
  status: OrderStatus;
  createdAt: string;
  isCancelled: boolean;
}

export interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
}

export interface CodeDirectory {
  name: string;
  path: string;
  files: CodeFile[];
  subdirectories?: CodeDirectory[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'email' | 'sms' | 'system';
  timestamp: string;
  recipient: string;
}
