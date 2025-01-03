import { useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

const baseURL = "http://localhost:8080";

export const useMappings = () => {
  const [mappings, setMappings] = useState<any>();
  const [mapping, setMapping] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  const getMappings = async ({
    sku,
    orderId,
  }: {
    sku?: string;
    orderId: number;
  }) => {
    try {
      const response = await fetch(
        `${baseURL}/mappings?orderId=${orderId}&${
          sku ? `digitalSku=${sku}` : ""
        }`
      );
      const data = await response.json();
      setMappings(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const getMapping = async (id: number) => {};

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
      if (response.ok) {
        toast.success("Mapped successfully");
        return responseData.id;
      } else {
        toast.error("Error creating mapping: " + responseData.message);
      }
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

      if (response.ok) {
        toast.success("Unmapped successfully");
      } else {
        toast.error("Error unmapping");
      }
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
    createMapping,
    deleteMapping,
  };
};
