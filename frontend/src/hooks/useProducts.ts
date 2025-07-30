import { useEffect, useState, useCallback } from "react";
import { Product, FilterParams } from "../types";
import { dummyProducts } from "../constants/options";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  isApiConnected: boolean;
  fetchProductsWithFilters: (filters: FilterParams) => Promise<void>;
}
interface ApiResponse {
  result: Product[];
  status: boolean;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:8080/api/products/");
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const response: ApiResponse = await res.json();

      if (!response.status || !response.result) {
        throw new Error("APIレスポンス形式が正しくありません");
      }

      setProducts(response.result);
      setIsApiConnected(true);
    } catch (fetchError) {
      setProducts(dummyProducts);
      setIsApiConnected(false);
      setError("APIからの取得に失敗しました。ダミーデータを表示しています。");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsWithFilters = useCallback(
    async (filters: FilterParams): Promise<void> => {
      if (!isApiConnected) return;

      try {
        setLoading(true);
        setError(null);

        // フィルタパラメータをクエリストリングに変換
        const params = new URLSearchParams();

        if (filters.keyword) {
          params.append("keyword", filters.keyword);
        }
        if (filters.category && filters.category !== "すべて") {
          params.append("category", filters.category);
        }
        if (filters.sizes && filters.sizes.length > 0) {
          params.append("size", filters.sizes.join(","));
        }
        if (filters.minPrice !== undefined) {
          params.append("min_price", filters.minPrice.toString());
        }
        if (filters.maxPrice !== undefined) {
          params.append("max_price", filters.maxPrice.toString());
        }
        if (filters.genre && filters.genre !== "ALL") {
          params.append("genre", filters.genre);
        }

        const url = `http://localhost:8080/api/products/?${params.toString()}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`フィルタリングAPI エラー: ${res.status}`);
        }

        const response: ApiResponse = await res.json();

        if (!response.status || !response.result) {
          throw new Error("フィルタリングAPIレスポンス形式エラー");
        }

        setProducts(response.result);
      } catch (fetchError) {
        console.error("フィルタリングエラー:", fetchError);
        // エラー時はAPIからの全取得にフォールバック
        await fetchProducts();
      } finally {
        setLoading(false);
      }
    },
    [isApiConnected]
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    isApiConnected,
    fetchProductsWithFilters,
  };
};
