import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import ProductForm from "../forms/ProductForm";

export default function ProductInfo({
  sku,
  product,
  getProduct,
  editProduct,
  deleteProduct,
}: any) {
  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteProduct(sku);
    if (res) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-full">
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-full"
                  onClick={() => getProduct(sku)}
                >
                  <Info stroke="#1a1a1a" strokeWidth={1.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More Info</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent className="p-8 px-12">
        <DialogHeader className="space-y-4">
          {edit ? (
            <>Edit</>
          ) : (
            <>
              <DialogTitle className="text-xl font-medium flex flex-row justify-between pr-10 mt-2">
                <span>{product?.name}</span>
                <span>$ {product?.price}</span>
              </DialogTitle>
              <DialogDescription>{product?.description}</DialogDescription>
            </>
          )}
        </DialogHeader>
        {edit ? (
          <ProductForm
            product={product}
            setEdit={setEdit}
            editProduct={editProduct}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-10 mt-5">
            <div className="flex flex-col">
              <Label htmlFor="sku">SKU</Label>
              <p className="font-mono">{product?.sku}</p>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="ean">EAN</Label>
              <p className="font-mono">{product?.ean}</p>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="color">Color</Label>
              <p>{product?.color}</p>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="size">Size</Label>
              <p>{product?.size}</p>
            </div>
          </div>
        )}
        <DialogFooter className="">
          {edit ? null : (
            <div className="flex flex-row justify-between w-full">
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="outline" onClick={() => setEdit(true)}>
                Edit
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
