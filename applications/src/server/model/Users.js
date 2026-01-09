export class Users {
  static tableName = "users";

  static async createUser(db, userData) {
    const { username, email, passwordHash } = userData;
    //hahahahaha
  }
}
