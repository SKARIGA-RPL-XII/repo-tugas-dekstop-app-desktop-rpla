import { supabase } from "../config/supabase.js";

const TABLE_NAME = "categories";
/**
 * Test koneksi ke supabase dan mengambil semua kategori
 * @returns {Promise<Array<Object> | null>} return array type
 */
export const getAllCategories = async ({
  created_at,
  page = 1,
  limit = 10,
  search = "",
} = {}) => {
  try {
    const offset = (page - 1) * limit;

    let query = supabase.from("categories").select(
      `
        *,
        products:products(id)
      `,
      { count: "exact" }
    );

    if (created_at) {
      query = query
        .gte("created_at", `${created_at}T00:00:00`)
        .lte("created_at", `${created_at}T23:59:59`);
    }
    if (search) {
      query = query.ilike("category_name", `%${search}%`);
    }

    const { data, count, error } = await query.range(
      offset,
      offset + limit - 1
    );
    if (error) throw error;

    const dataWithProductCount = (data || []).map((cat) => ({
      ...cat,
      product_count: cat.products?.length || 0,
      products: undefined,
    }));

    return {
      success: true,
      status: 200,
      message: "Categories retrieved successful",
      data: dataWithProductCount,
      meta: {
        page,
        limit,
        count: count || 0,
      },
    };
  } catch (err) {
    console.error("Error fetching categories:", err.message || err);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch categories",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        count: 0,
      },
    };
  }
};

export const getCategoryById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    return null;
  }
  return data;
};

export const updateCategory = async (id, dataUpdate) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(dataUpdate)
    .eq("id", id)
    .select();
  if (error) {
    formatFieldError(error);
  }
  return { data: data[0], error: error };
};

export const deleteCategory = async (id) => {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    formatFieldError(error);
  }
  return { message: "berhasil dihapus" };
};

export const createCategory = async (category) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([category])
    .select();
  if (error) {
    formatFieldError(error);
  }
  return {
    success: true,
    message: "Category created successfully",
    data: data[0],
  };
};
