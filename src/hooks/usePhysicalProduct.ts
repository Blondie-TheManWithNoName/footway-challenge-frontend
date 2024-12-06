import { useEffect, useState } from "react";
import { set } from "zod";

const baseURL = "http://localhost:8080";

export const usePhysicalProduct = () => {
  const [physicalProducts, setPhysicalProducts] = useState<[]>([]);
  const [physicalProduct, setPhysicalProduct] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);
  const [recomendation, setRecomendation] = useState<any>();

  const getPhysicalProducts = async (
    page: number | undefined,
    take: number | undefined,
    search: string | undefined
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/physical-products?${"page=" + (page ?? 1)}&${
          "take=" + (take ?? 10)
        }&${"search=" + search}`
      );
      const data = await response.json();
      setPhysicalProducts(data.content);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const getPhysicalProduct = async (sku: string) => {
    try {
      const response = await fetch(`${baseURL}/physical-products/${sku}`);
      const data = await response.json();
      setPhysicalProduct(data);
    } catch (error) {
      setError(error);
    }
  };

  const getRecomendation = async (ean: string) => {
    try {
      const response = await fetch(`${baseURL}/physical-products/ean/${ean}`);
      if (response.status === 200) {
        const data = await response.json();
        setRecomendation(data);
      }
    } catch (error) {
      setError(error);
    }
  };
  const editPhysicalProduct = async (id: string, data: Object) => {
    try {
      const response = await fetch(`${baseURL}/physical-products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      setPhysicalProduct(responseData);
    } catch (error) {
      setError(error);
    }
  };

  return {
    physicalProducts,
    physicalProduct,
    recomendation,
    setRecomendation,
    isLoading,
    error,
    getPhysicalProducts,
    getPhysicalProduct,
    editPhysicalProduct,
    getRecomendation,
  };
};
