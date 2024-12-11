import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import ProductForm from "../components/forms/ProductForm";
import ProductPreview from "@/components/products/ProductPreview";
import { useDigitalProduct } from "@/hooks/useDigitalProduct";
import { usePagination } from "@/hooks/usePagination";
import { useState } from "react";

export default function DigitalProducts() {
  const {
    digitalProducts,
    getDigitalProducts,
    isLoading,
    createDigitalProdcut,
  } = useDigitalProduct();

  const { handleScroll, setSearch, search, setPage } = usePagination({
    id: undefined,
    digital: true,
    getProducts: getDigitalProducts,
    take: 20,
  });

  // Handle scroll event
  // const onScroll = (e: React.UIEvent<HTMLElement>) => {
  //   handleScroll(e);
  // };
  const [open, setOpen] = useState(false);

  return (
    <section
      className="w-full h-full flex flex-col items-center"
      // onScroll={onScroll}
    >
      <div className=" gap-x-10 px-20 w-full flex flex-col pt-16">
        <h1 className="text-center text-xl col-span-2 font-medium uppercase">
          Digital Products
        </h1>
        <div className="flex flex-col gap-y-3 justify-end items-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="px-4 py-1 max-w-40">
                Create Digital Product
              </Button>
            </DialogTrigger>
            <DialogContent className="p-8 px-12">
              <DialogHeader className="space-y-4">
                <DialogTitle className="text-xl font-medium flex flex-row justify-between pr-10 mt-2">
                  Create Digital Prodcut
                </DialogTitle>
              </DialogHeader>
              <ProductForm
                createProduct={createDigitalProdcut}
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
          digitalProducts.map((digitalProduct: any) => (
            <ProductPreview
              key={"digital" + digitalProduct.sku}
              productInfo={{
                sku: digitalProduct.sku,
                name: digitalProduct.name,
                ean: digitalProduct.ean,
                image: digitalProduct.image,
              }}
              digital={true}
              map={false}
            />
          ))
        )}
      </div>
    </section>
  );
}
