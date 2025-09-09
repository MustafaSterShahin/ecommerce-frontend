export interface ProductDto {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId: number;
  imageUrl?: string;
}
