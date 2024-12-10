import { useEffect, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

const baseURL = "http://localhost:8080";

export const useDigitalProduct = () => {
  const [digitalProducts, setDigitalProducts] = useState<any[]>([]);
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
      if (page === 1) setDigitalProducts(data.content);
      else setDigitalProducts((prev) => [...prev, ...data.content]);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const getOrderDigitalProducts = async (
    id: number,
    page: number | undefined,
    take: number | undefined,
    search: string | undefined
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/orders/${id}/digital-products?${"page=" + (page ?? 1)}&${
          "take=" + (take ?? 10)
        }&${"search=" + search}`
      );
      const data = await response.json();
      if (page === 1) setDigitalProducts(data.content);
      else setDigitalProducts((prev) => [...prev, ...data.content]);
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

  const createDigitalProdcut = async (data: Object) => {
    try {
      const response = await fetch(`${baseURL}/digital-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Digital Product created successfully");
        setDigitalProducts((prev) => [...prev, responseData]);
        return true;
      } else {
        toast.error("Error creating digital product: " + responseData.message);
        return false;
      }
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

  const deleteDigitalProduct = async (sku: number) => {
    try {
      const response = await fetch(`${baseURL}/digital-products/${sku}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Digital Product deleted successfully");
        setDigitalProducts((prev) =>
          prev.filter((product) => product.sku !== sku)
        );
        return true;
      } else {
        const responseData = await response.json();
        toast.error("Error deleting digital product: " + responseData.message);
        return false;
      }
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
    getOrderDigitalProducts,
    createDigitalProdcut,
    deleteDigitalProduct,
  };
};
