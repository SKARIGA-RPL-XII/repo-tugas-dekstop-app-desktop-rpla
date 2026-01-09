import bcrypt from "bcryptjs";

export class Users {
  static tableName = "users";

  static async getAll(db) {
    const { data, error } = await db.from(this.tableName).select("*");

    if (error) throw new Error(error.message);

    return data;
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

    return data;
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
}
