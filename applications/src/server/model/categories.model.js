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
    return { success: true, message: "Category created successfully", data: data[0] };
};

export const filterCategoriesModel = async ({ created_at, page = 1, limit = 10, search = "" }) => {
    let query = supabase.from("categories").select("*");

    if (created_at) {
        query = query.gte("created_at", `${created_at}T00:00:00`)
            .lte("created_at", `${created_at}T23:59:59`);
    }
    if (search) {
        query = query.ilike("category_name", `%${search}%`);
    }

    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;
    if (error)
        formatFieldError(error);
    return { data, page, limit, count: data ? data.length : 0 };
}
