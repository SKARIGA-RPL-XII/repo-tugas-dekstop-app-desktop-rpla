import bcrypt from "bcryptjs";

export class Products {
    static tableName = "products";

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
            .select("id, product_name, price, description, url_image, created_at")
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

    static async block(db, id) {
        const { data, error } = await db
            .from(this.tableName)
            .update({ is_blocked: true })
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

    // Filter products by created_at, pagination, and search
    static async filterProducts(db, { created_at, page = 1, limit = 10, search = "" }) {
        let query = db.from(this.tableName).select("*");

        if (created_at) {
            query = query.gte("created_at", `${created_at}T00:00:00`)
                .lte("created_at", `${created_at}T23:59:59`);
        }

        if (search) {
            query = query.ilike("product_name", `%${search}%`);
        }

        // Pagination
        const offset = (page - 1) * limit;
        query = query.range(offset, offset + limit - 1);

        const { data, error, count } = await query;
        if (error) throw new Error(error.message);
        return { data, page, limit, count: data ? data.length : 0 };
    }
}
