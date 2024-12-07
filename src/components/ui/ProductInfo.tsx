import React, { useEffect, useState } from "react";
import {
  Cable,
  Check,
  ChevronsLeftRightEllipsis,
  Info,
  MoveHorizontal,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";

import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProductForm from "./ProductForm";
import { usePhysicalProduct } from "@/hooks/usePhysicalProduct";
export default function ProductInfo({ sku }: any) {
  const [edit, setEdit] = React.useState(false);
  const { physicalProduct, getPhysicalProduct, editPhysicalProduct } =
    usePhysicalProduct();

  function handleInfoClick() {
    getPhysicalProduct(sku);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-full">
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-full"
                  onClick={handleInfoClick}
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
                <span>{physicalProduct?.name}</span>
                <span>$ {physicalProduct?.price}</span>
              </DialogTitle>
              <DialogDescription>
                {physicalProduct?.description}
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        {edit ? (
          <ProductForm
            product={physicalProduct}
            setEdit={setEdit}
            editPhysicalProduct={editPhysicalProduct}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-10 mt-5">
            <div className="flex flex-col">
              <Label htmlFor="sku">SKU</Label>
              <p>{physicalProduct?.sku}</p>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="ean">EAN</Label>
              <p>{physicalProduct?.ean}</p>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="color">Color</Label>
              <p>{physicalProduct?.color}</p>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="size">Size</Label>
              <p>{physicalProduct?.size}</p>
            </div>
          </div>
        )}
        <DialogFooter className="">
          {edit ? (
            <></>
          ) : (
            <div className="flex flex-row sm:justify-between w-full">
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
