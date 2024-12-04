import { useEffect, useState } from "react";

const baseURL = "http://localhost:8080";

export const useDigitalProduct = () => {
  const [digitalProducts, setDigitalProducts] = useState<[]>([]);
  const [digitalProduct, setDigitalProduct] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  const getDigitalProducts = async (
    page: number | undefined,
    take: number | undefined,
    search: string | undefined
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/digital-products?${"page=" + (page ?? 1)}&${
          "take=" + (take ?? 10)
        }&${"search=" + search}`
      );
      const data = await response.json();
      console.log(data);
      setDigitalProducts(data.content);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const getDigitalProduct = async (sku: string) => {
    try {
      const response = await fetch(`${baseURL}/digital-products/${sku}`);
      const data = await response.json();
      setDigitalProduct(data);
    } catch (error) {
      setError(error);
    }
  };

  const editDigitalProduct = async (id: string, data: Object) => {
    try {
      const response = await fetch(`${baseURL}/digital-products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      setDigitalProduct(responseData);
    } catch (error) {
      setError(error);
    }
  };

  return {
    digitalProducts,
    digitalProduct,
    isLoading,
    error,
    getDigitalProducts,
    getDigitalProduct,
    editDigitalProduct,
  };
};
