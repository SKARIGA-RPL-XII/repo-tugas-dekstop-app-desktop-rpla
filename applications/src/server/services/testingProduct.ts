import ApiClient from "../../utils/apiClient";

export class TestingProductService {
  static async getProducts() {
    try {
      const res = await ApiClient.get("/products");
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
