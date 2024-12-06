import { useState } from "react";

const baseURL = "http://localhost:8080";

export const useMappings = () => {
  const [mappings, setMappings] = useState<any>();
  const [mapping, setMapping] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  const getMappings = async (sku: string) => {
    try {
      const response = await fetch(
        `${baseURL}/mappings?${"digitalSku=" + sku}`
      );
      const data = await response.json();
      setMappings(data);
    } catch (error) {
      setError(error);
    }
  };

  const getMapping = async (sku: string) => {
    // try {
    //   const response = await fetch(`${baseURL}/physical-products/${sku}`);
    //   const data = await response.json();
    //   setPhysicalProduct(data);
    // } catch (error) {
    //   setError(error);
    // }
  };

  const editMapping = async (id: string, data: Object) => {
    // try {
    //   const response = await fetch(`${baseURL}/physical-products/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const responseData = await response.json();
    //   setPhysicalProduct(responseData);
    // } catch (error) {
    //   setError(error);
    // }
  };

  const createMapping = async (data: Object) => {
    try {
      const response = await fetch(`${baseURL}/mappings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData.id;
    } catch (error) {
      setError(error);
    }
  };

  const deleteMapping = async (id: number) => {
    try {
      const response = await fetch(`${baseURL}/mappings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
    } catch (error) {
      setError(error);
    }
  };

  return {
    mappings,
    mapping,
    isLoading,
    error,
    getMappings,
    getMapping,
    editMapping,
    createMapping,
    deleteMapping,
  };
};
