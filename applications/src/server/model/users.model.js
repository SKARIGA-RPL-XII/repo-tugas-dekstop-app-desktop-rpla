import bcrypt from "bcryptjs";

export class Users {
  static tableName = "users";

  static async getAll(db, query = {}) {
    try {
      const page = parseInt(query.page, 10) || 1;
      const limit = parseInt(query.limit, 10) || 10;
      const search = query.search || "";
      const role = query.role || "";
      const is_blocked = query.is_blocked || "";
      const created_at = query.created_at || "";

      let supabaseQuery = db
        .from(this.tableName)
        .select("*", { count: "exact" });

      if (search) {
        supabaseQuery = supabaseQuery.ilike("username", `%${search}%`);
      }

      if (is_blocked) {
        supabaseQuery = supabaseQuery.eq("is_blocked", `${is_blocked}`);
      }

      if (created_at) {
        supabaseQuery = supabaseQuery.order("created_at", { ascending: false });
      }

      if (role) {
        supabaseQuery = supabaseQuery.eq("role", `${role}`);
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      supabaseQuery = supabaseQuery.range(from, to);

      const { data, error, count } = await supabaseQuery;

      if (error) throw new Error(error.message);

      return {
        data: data || [],
        count: count ?? data?.length ?? 0,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async create(db, payload) {
    const { username, email, passwordHash, role = "user" } = payload;

    const { data, error } = await db
      .from(this.tableName)
      .insert([
        {
          username,
          email,
          password: passwordHash,
          role,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);

    const { password, ...safeData } = data;

    return safeData;
  }

  static async findById(db, id) {
    const { data, error } = await db
      .from(this.tableName)
      .select("id, username, email, role, is_blocked, created_at")
      .eq("id", id)
      .single();

    if (error) throw new Error("User not found");
    return data;
  }

  static async findByEmail(db, email) {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await db
      .from(this.tableName)
      .select("*")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (error) console.log("Supabase error:", error);
    return data;
  }

  static async findById(db, id) {
    const { data, error } = await db
      .from(this.tableName)
      .select("id, username, email, role, is_blocked, created_at")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

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

    const { password, ...safeData } = data;

    return safeData;
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
}
