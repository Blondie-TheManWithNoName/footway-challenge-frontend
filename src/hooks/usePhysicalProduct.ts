import { useEffect, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

const baseURL = "http://localhost:8080";

export const usePhysicalProduct = () => {
  const [physicalProducts, setPhysicalProducts] = useState<any[]>([]);
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
      if (page === 1) setPhysicalProducts(data.content);
      else setPhysicalProducts((prev) => [...prev, ...data.content]);
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
      const response = await fetch(
        `${baseURL}/physical-products?${"ean=" + ean}`
      );
      if (response.status === 200) {
        const data = await response.json();
        if (data.content.length > 0) setRecomendation(data.content[0]);
        else setRecomendation(undefined);
      }
    } catch (error) {
      setError(error);
    }
  };

  const createPhysicalProdcut = async (data: Object) => {
    try {
      console.log("data", data);
      const response = await fetch(`${baseURL}/physical-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Physical Product created successfully");
        setPhysicalProducts((prev) => [...prev, responseData]);
        return true;
      } else {
        toast.error("Error creating physical product: " + responseData.message);
        return false;
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

  const deletePhysicalProduct = async (sku: number) => {
    try {
      const response = await fetch(`${baseURL}/physical-products/${sku}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Physical Product deleted successfully");
        setPhysicalProducts((prev) =>
          prev.filter((product) => product.sku !== sku)
        );
        return true;
      } else {
        const responseData = await response.json();
        toast.error("Error deleting physical product: " + responseData.message);
        return false;
      }
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
    createPhysicalProdcut,
    deletePhysicalProduct,
  };
};
