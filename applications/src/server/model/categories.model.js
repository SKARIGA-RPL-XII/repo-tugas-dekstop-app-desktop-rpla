import { supabase } from "../config/supabase.js";
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
  if (error) throw error;
  return { data, page, limit, count: data ? data.length : 0 };
}
