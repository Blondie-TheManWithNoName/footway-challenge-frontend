import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductPreview from "./ProductPreview";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { usePagination } from "@/hooks/usePagination";
import { usePhysicalProduct } from "@/hooks/usePhysicalProduct";

export default function PhysicalProducts() {
  const {
    physicalProducts,
    getPhysicalProducts,
    isLoading,
    createPhysicalProdcut,
  } = usePhysicalProduct();

  const { handleScroll, setSearch, search, setPage } = usePagination({
    id: undefined,
    digital: true,
    getProducts: getPhysicalProducts,
    take: 20,
  });

  // Handle scroll event
  const onScroll = (e: any) => {
    handleScroll(e);
  };

  const [open, setOpen] = useState(false);

  return (
    <section
      className="w-full h-full flex flex-col items-center"
      onScroll={onScroll}
    >
      <div className=" gap-x-10 px-20 w-full flex flex-col pt-16">
        <h1 className="text-center text-xl col-span-2 font-medium uppercase">
          Physical Products
        </h1>
        <div className="flex flex-col gap-y-3 justify-end items-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="px-4 py-1 max-w-44">
                Create Pyhsical Product
              </Button>
            </DialogTrigger>
            <DialogContent className="p-8 px-12">
              <DialogHeader className="space-y-4">
                <DialogTitle className="text-xl font-medium flex flex-row justify-between pr-10 mt-2">
                  Create Physical Prodcut
                </DialogTitle>
              </DialogHeader>
              <ProductForm
                createProduct={createPhysicalProdcut}
                setEdit={setOpen}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col max-w-[22rem] w-full mt-[1vh] items-center gap-x-2 relative">
        <p className="text-xs text-violet-800 text-left w-full ml-3">
          Search for a name or description
        </p>
        <Input
          placeholder={`Winter Boots`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-x-10 max-w-[80rem] px-10 pt-10 pb-20">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          physicalProducts.map((physicalProduct: any) => (
            <ProductPreview
              key={"physical" + physicalProduct.sku}
              productInfo={{
                sku: physicalProduct.sku,
                name: physicalProduct.name,
                ean: physicalProduct.ean,
                image: physicalProduct.image,
              }}
              digital={false}
              map={false}
            />
          ))
        )}
      </div>
    </section>
  );
}
