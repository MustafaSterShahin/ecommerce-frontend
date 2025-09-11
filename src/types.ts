export interface ProductDto {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId: number;
  imageUrl: string | null;
  imageUrls: string[] | null;
  details: string;
  supplierID: number;
}
export interface Category {
  categoryId: number;
  categoryName: string;
}
export interface ProductListProps {
  products: ProductDto[];
  categories: Category[];
}