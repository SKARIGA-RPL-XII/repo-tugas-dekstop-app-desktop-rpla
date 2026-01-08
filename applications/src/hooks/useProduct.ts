import { useEffect, useState } from "react";
import ApiClient from "../utils/apiClient";

export const useProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fethApi = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await ApiClient.get("/products");
      const data = res.data;
      setProduct(data);
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
