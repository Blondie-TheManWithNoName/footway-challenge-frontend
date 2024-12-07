import "./App.css";
import { Input } from "@/components/ui/input";
import ProductPreview from "./components/ui/ProductPreview";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { usePhysicalProduct } from "./hooks/usePhysicalProduct";
import { useEffect, useState } from "react";
import { useDigitalProduct } from "./hooks/useDigitalProduct";
import { useMappingsContext } from "./contexts/MappingContext";
import { set } from "zod";
import { MoveHorizontal } from "lucide-react";
export default function Mapping() {
  // Mapping Context
  const { userMapping } = useMappingsContext();

  const {
    physicalProducts,
    isLoading: isPhysicalProductsLoading,
    getPhysicalProducts,
    getRecomendation,
    recomendation,
    setRecomendation,
  } = usePhysicalProduct();

  const {
    digitalProducts,
    isLoading: isDigitalProductsLoading,
    getDigitalProducts,
  } = useDigitalProduct();

  useEffect(() => {
    if (userMapping) {
      getRecomendation(userMapping.ean);
    } else setRecomendation(undefined);
  }, [userMapping]);

  const [searchDigital, setSearchDigital] = useState<string>("");
  const [searchPhysical, setSearchPhysical] = useState<string>("");

  useEffect(() => {
    getDigitalProducts(1, 10, searchDigital);
  }, [searchDigital]);
  useEffect(() => {
    getPhysicalProducts(1, 10, searchPhysical);
  }, [searchPhysical]);

  return (
    <div className="hidden md:grid grid-cols-2">
      <h1 className="col-span-2 text-center text-2xl font-medium uppercase pt-[3vh]">
        <MoveHorizontal stroke="#181818" strokeWidth={1.5} scale={4} />
        Map Products
      </h1>
      <section className="flex flex-col items-center pt-[6vh]">
        <h2 className="text-xl font-medium">Digital Products</h2>
        <Input
          className="max-w-[25rem] mt-[1vh]"
          placeholder="Search"
          value={searchDigital}
          onChange={(e) => setSearchDigital(e.target.value)}
        />

        <ScrollArea className="h-[75vh] max-w-md overflow-y-auto border-0 mt-[2vh]">
          <div className="w-full px-4">
            {isDigitalProductsLoading ? (
              <div>Loading...</div>
            ) : (
              digitalProducts.map((digitalProduct: any) => (
                <ProductPreview
                  key={digitalProduct.sku}
                  productInfo={{
                    sku: digitalProduct.sku,
                    name: digitalProduct.name,
                    ean: digitalProduct.ean,
                    image: digitalProduct.image,
                  }}
                  digital={true}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </section>

      <section className="flex flex-col items-center pt-[6vh]">
        <h2 className="text-xl font-medium">Physical Products</h2>
        <Input
          className="max-w-[25rem] mt-[1vh]"
          placeholder="Search"
          value={searchPhysical}
          onChange={(e) => setSearchPhysical(e.target.value)}
        />
        {recomendation ? (
          <>
            <div className="max-w-sm mt-[2vh] border-2 border-transparent border-b-violet-800 p-4">
              <h3 className="text-xl font-medium">Recomendation</h3>

              <ProductPreview
                key={recomendation.sku}
                productInfo={{
                  sku: recomendation.sku,
                  name: recomendation.name,
                  ean: recomendation.ean,
                  image: recomendation.image,
                }}
                digital={false}
              />
            </div>
          </>
        ) : null}
        <ScrollArea className="h-[75vh] max-w-md overflow-y-auto border-0 mt-[2vh]">
          <div className="w-full px-4">
            {isPhysicalProductsLoading ? (
              <div>Loading...</div>
            ) : (
              physicalProducts.map((physicalProduct: any) => (
                <ProductPreview
                  key={physicalProduct.sku}
                  productInfo={{
                    sku: physicalProduct.sku,
                    name: physicalProduct.name,
                    ean: physicalProduct.ean,
                    image: physicalProduct.image,
                  }}
                  digital={false}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}