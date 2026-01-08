import { supabase } from "../config/supabase.js";

const TABLE_NAME = "categories";
/**
 * Test koneksi ke supabase dan mengambil semua kategori
 * @returns {Promise<Array<Object> | null>} return array type
 */
export const getAllCategories = async () => {
  console.log(`Testing connection and fetching data from table: ${TABLE_NAME}`);

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching categories from Supabase:", error);
    return null;
  }

  console.log(`Successfully fetched ${data ? data.length : 0} categories.`);
  return data;
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

export const createCategory = async (category) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([category])
    .single();
  if (error) {
    console.error("Error creating category:", error);
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
    console.error(`Error updating category with id ${id}:`, error);
    return null;
  }
  return { data: data[0], error: error };
};

export const deleteCategory = async (id) => {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    return null;
  }
  return { message: "berhasil dihapus" };
};
