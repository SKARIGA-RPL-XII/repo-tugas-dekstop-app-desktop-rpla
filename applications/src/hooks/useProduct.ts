import { useEffect, useState } from "react";
import ApiClient from "../utils/apiClient";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const useProduct = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fethApi = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await ApiClient.get<Product[]>("/products");
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fethApi();
  }, []);

  return { product, loading };
};
