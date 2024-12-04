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

import { usePhysicalProduct } from "@/hooks/usePhysicalProduct";
import ProductForm from "./ProductForm";
import { useMappings } from "@/hooks/useMappings";

export default function ProductPreview({
  name,
  sku,
  ean,
  mappings,
  userMapping,
  setUserMapping,
  digital,
}: any) {
  const [edit, setEdit] = React.useState(false);
  const [mapped, setMapped] = useState<number>(0);
  const { mapping, getMapping, editMapping, createMapping, deleteMapping } =
    useMappings();
  const { physicalProduct, getPhysicalProduct, editPhysicalProduct } =
    usePhysicalProduct();

  function handleInfoClick(event: React.MouseEvent<HTMLButtonElement>) {
    getPhysicalProduct(sku);
  }

  useEffect(() => {
    if (!digital) {
      const mapped = mappings.find(
        (mapping) => mapping.physicalProductSku === userMapping
      );
      if (mapped) setMapped(mapped.id);
      else setMapped(0);
    }
  }, [userMapping]);

  async function handleMapClick(event: React.MouseEvent<HTMLButtonElement>) {
    // getMapping(sku);
    if (digital) {
      setUserMapping(userMapping ? undefined : sku);
    } else {
      if (userMapping) {
        if (mapped !== 0) {
          deleteMapping(mapped);
          setMapped(0);
        } else {
          const id = await createMapping({
            physicalProductSku: sku,
            digitalProductSku: userMapping,
          });
          setMapped(id);
        }
      }
    }
  }
  return (
    <div
      className={`grid grid-cols-[25%_50%_25%] ${
        mapped
          ? "bg-[#93ffa3]"
          : userMapping === sku && digital
          ? "bg-[#75aaff]"
          : "bg-[#FFFFFF]"
      } rounded-xl pt-2 pb-4 px-4 shadow border overflow-hidden mt-8`}
    >
      <img
        src="./shoes.jpg"
        alt="shoes"
        className="w-full aspect-square rounded-lg mt-2"
      />
      <div className="flex flex-col ml-2 mt-1 justify-between pb-2">
        <h3 className="text-md font-medium leading-tight">{name}</h3>
        <div className="mt-2.5 grid grid-rows-2 gap-y-1 w-full">
          <p className="text-sm tracking-wide leading-none">
            <span className="font-medium">SKU: </span>
            {sku}
          </p>
          <p className="text-sm tracking-wide leading-none">
            <span className="font-medium">EAN: </span>
            {ean}
          </p>
        </div>
      </div>
      <div className="flex flex-col relative justify-between items-center py-1.5 gap-y-2 px-2">
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
                  <Button
                    variant="outline"
                    onClick={
                      () => setEdit(true)
                      // editPhysicalProduct(physicalProduct.sku, {
                      //   physicalProduct,
                      // })
                    }
                  >
                    Edit
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                className="w-full h-full"
                onClick={handleMapClick}
                disabled={
                  (!userMapping && !digital) ||
                  (userMapping !== undefined && userMapping !== sku && digital)
                }
              >
                {digital ? (
                  <MoveHorizontal stroke="#FFFFFF" strokeWidth={1.5} />
                ) : mapped ? (
                  <X stroke="#FFFFFF" strokeWidth={1.5} />
                ) : userMapping ? (
                  <Check stroke="#FFFFFF" strokeWidth={1.5} />
                ) : undefined}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Map Prodcut</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
