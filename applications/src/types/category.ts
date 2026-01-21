export type CategoryData = {
  id: number;
  category_name: string;
  product_count: number;
  createdAt: string;
};

export interface Category {
  id?: number;
  nama: string;
  product_count?: number;
  created_at?: string;
}
export interface GetCategoriesParams {
  search?: string;
  page?: number;
  limit?: number;

  start_date?: string; // ✅ TAMBAH
  end_date?: string;   // (opsional)
}


export interface CategoryForm {
  category_name: string;
}

export interface CategoryFormErrors {
  category_name?: string;
}
