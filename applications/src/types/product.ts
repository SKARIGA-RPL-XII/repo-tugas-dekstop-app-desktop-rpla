/* ===================== PRODUCT DATA ===================== */
export interface Product {
  id: string;
  name: string;
  code?: string;
  url_image?: string;
  category_id: string;
  category_name?: string;
  product_name?: string;
  product_code?: string;
  price: number;
  stock: number;
  is_active: boolean;
  created_at: string;
}

/* ===================== ALIAS (UNTUK TABLE / DIALOG) ===================== */
export type ProductData = Product;

/* ===================== FORM ===================== */
export interface ProductForm {
  name: string;
  category_id: string;
  price: number;
  stock: number;
  is_active: boolean;
}

/* ===================== FORM ERRORS ===================== */
export interface ProductFormErrors {
  name?: string;
  category_id?: string;
  price?: string;
  stock?: string;
  is_active?: string;
}

/* ===================== GET PARAMS ===================== */
export interface GetProductsParams {
  search?: string;
  page?: number;
  limit?: number;

  category_id?: string;
  is_active?: boolean;
}
