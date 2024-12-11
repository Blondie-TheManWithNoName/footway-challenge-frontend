import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import React, { useEffect, useState } from "react";

import { Button } from "../components/ui/button";
import OrderForm from "../components/forms/OrderForm";
import OrderPreview from "../components/orders/OrderPreview";
import { useOrders } from "@/hooks/useOrders";

export default function Orders() {
  const { orders, getOrders, isLoading } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* <h1 className="col-span-2 text-center text-xl font-medium uppercase pt-16">
        Orders
      </h1> */}
      <div className=" gap-x-10 px-20 w-full flex flex-col pt-16">
        <h1 className="text-center text-xl col-span-2 font-medium uppercase">
          ORDERS
        </h1>
        <div className="flex flex-col gap-y-3 justify-end items-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="px-4 py-1 max-w-32 ">
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="p-8 px-12">
              <DialogHeader className="space-y-4">
                <DialogTitle className="text-xl font-medium flex flex-row justify-between pr-10 mt-2">
                  Create Order
                </DialogTitle>
              </DialogHeader>
              <OrderForm setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <section className="flex flex-col gap-x-10 max-w-[80rem] min-w-96 px-10 pt-10 gap-y-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex flex-row w-full items-center justify-between pr-16 pl-6">
              <h2>ID</h2>
              {/* <h2>Open</h2> */}
              <h2># Prod.</h2>
            </div>
            {orders.map((order: any) => (
              <OrderPreview
                key={"order" + order.id}
                id={order.id}
                digitalProductsCount={order.digitalProductsCount}
                href={order.href}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
