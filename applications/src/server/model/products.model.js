import bcrypt from "bcryptjs";

export class Products {
    static tableName = "products";

    static async getLastProductCode(db) {
        const { data, error } = await db
            .from(this.tableName)
            .select("product_code")
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        if (error) return null; 
        return data.product_code;
    }


    static async getAll(db) {
        const { data, error } = await db.from(this.tableName).select("*");

        if (error) throw new Error(error.message);

        return data;
    }

    static async create(db, payload) {
        const { data, error } = await db
            .from(this.tableName)
            .insert(payload)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }


    static async findById(db, id) {
        const { data, error } = await db
            .from(this.tableName)
            .select(`
              id,
              product_name,
              price,
              description,
              url_image,
              created_at,
              stock,
              category_id,
              product_code,
              is_active,
              categories (
                category_name
              )
            `)
            .eq("id", id)
            .single();
        if (error) throw new Error("Product not found");
        return data;
    }

    static async update(db, id, payload) {
        const { data, error } = await db
            .from(this.tableName)
            .update(payload)
            .eq("id", id)
            .select()
            .single();

        if (error) throw new Error(error.message);

        return data;
    }

    static async delete(db, id) {
        const { error } = await db.from(this.tableName).delete().eq("id", id);

        if (error) throw new Error(error.message);

        return true;
    }

    static async verifyPassword(password, passwordHash) {
        return await bcrypt.compare(password, passwordHash);
    }

    static async filterProducts(
      db,
      {
        page = 1,
        limit = 10,
        search = "",
        category_id,
        is_active,
        min_price,
        max_price,
        min_stock,
        max_stock,
        start_date,
        end_date,
      }
    ) {
      const offset = (page - 1) * limit;
      const to = offset + limit - 1;

      let query = db
        .from(this.tableName)
        .select(
          `
          id,
          product_name,
          price,
          description,
          url_image,
          stock,
          is_active,
          created_at,
          product_code,
          category_id,
          categories (
            category_name
          )
          `,
          { count: "exact" }
        );

      /* 🔍 SEARCH */
      if (search) {
        query = query.ilike("product_name", `%${search}%`);
      }

      /* 📂 KATEGORI */
      if (category_id) {
        query = query.eq("category_id", category_id);
      }

      /* ✅ STATUS */
      if (is_active !== undefined && is_active !== "") {
        query = query.eq("is_active", is_active === "true");
      }

      /* 💰 RANGE HARGA */
      if (min_price) query = query.gte("price", min_price);
      if (max_price) query = query.lte("price", max_price);

      /* 📦 RANGE STOK */
      if (min_stock) query = query.gte("stock", min_stock);
      if (max_stock) query = query.lte("stock", max_stock);

      /* 📅 TANGGAL */
      if (start_date) {
        query = query.gte("created_at", `${start_date}T00:00:00`);
      }
      if (end_date) {
        query = query.lte("created_at", `${end_date}T23:59:59`);
      }

      query = query.range(offset, to);

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);

      return {
        data,
        page,
        limit,
        count,
      };
    }


}
