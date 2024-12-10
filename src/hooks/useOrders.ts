import { useState } from "react";
import { toast } from "sonner";

const baseURL = "http://localhost:8080";

export const useOrders = () => {
  const [orders, setOrders] = useState<any>();
  const [order, setOrder] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  const getOrders = async () => {
    try {
      const response = await fetch(`${baseURL}/orders`);
      const data = await response.json();
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const getOrder = async (id: number) => {
    try {
      const response = await fetch(`${baseURL}/orders/${id}`);
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      setError(error);
    }
  };

  const createOrder = async (digitalProductsSkus: string[]) => {
    try {
      const response = await fetch(`${baseURL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ digitalProductsSkus }),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Order created successfully");
        return responseData.id;
      } else {
        toast.error("Error creating order: " + responseData.message);
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      const response = await fetch(`${baseURL}/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Order deleted successfully");
      } else {
        const responseData = await response.json();
        toast.error("Error deleting order: " + responseData.message);
      }
    } catch (error) {
      setError(error);
    }
  };

  return {
    orders,
    order,
    isLoading,
    error,
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
  };
};
