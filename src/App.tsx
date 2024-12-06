import "./App.css";
import { Input } from "@/components/ui/input";
import ProductPreview from "./components/ui/ProductPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { usePhysicalProduct } from "./hooks/usePhysicalProduct";
import { useEffect, useState } from "react";
import { useDigitalProduct } from "./hooks/useDigitalProduct";
import { useMappings } from "./hooks/useMappings";

function App() {
  const {
    physicalProducts,
    isLoading: isPhysicalProductsLoading,
    getPhysicalProducts,
    getRecomendation,
    recomendation,
    setRecomendation,
  } = usePhysicalProduct();

  const { mappings, getMappings, editMapping, createMapping, deleteMapping } =
    useMappings();

  const {
    digitalProducts,
    isLoading: isDigitalProductsLoading,
    getDigitalProducts,
  } = useDigitalProduct();
  const [userMapping, setUserMapping] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (userMapping) {
      getRecomendation(userMapping.ean);
    } else setRecomendation(undefined);
  }, [userMapping]);

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    getPhysicalProducts(1, 10, search);
    getDigitalProducts(1, 10, search);
  }, [search]);

  return (
    <main className="w-screen h-screen pt-[5vh]">
      {/* For larger screens */}
      <div className="hidden md:grid grid-cols-2">
        <section className="flex flex-col items-center">
          <h2 className="text-xl font-medium">Digital Products</h2>
          <Input
            className="max-w-sm mt-[5vh]"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ScrollArea className="h-[75vh] max-w-sm overflow-y-auto rounded-md border-0 mt-[2vh]">
            <div className="w-full px-4">
              {isDigitalProductsLoading ? (
                <div>Loading...</div>
              ) : (
                digitalProducts.map((digitalProduct: any) => (
                  <ProductPreview
                    key={digitalProduct.sku}
                    sku={digitalProduct.sku}
                    name={digitalProduct.name}
                    ean={digitalProduct.ean}
                    mappings={mappings}
                    getMappings={getMappings}
                    editMapping={editMapping}
                    createMapping={createMapping}
                    deleteMapping={deleteMapping}
                    userMapping={userMapping}
                    setUserMapping={setUserMapping}
                    digital={true}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </section>

        <section className="flex flex-col items-center">
          <h2 className="text-xl font-medium">Physical Products</h2>
          <Input className="max-w-sm mt-[5vh]" placeholder="Search" />

          {recomendation ? (
            <>
              <div className="max-w-sm mt-[2vh] bg-blue-400  rounded-xl p-4">
                <h3 className="text-xl font-medium">Recomendation</h3>

                <ProductPreview
                  key={recomendation.sku}
                  sku={recomendation.sku}
                  name={recomendation.name}
                  mappings={mappings}
                  ean={recomendation.ean}
                  getMappings={getMappings}
                  editMapping={editMapping}
                  createMapping={createMapping}
                  deleteMapping={deleteMapping}
                  userMapping={userMapping}
                  setUserMapping={setUserMapping}
                  digital={false}
                />
              </div>
            </>
          ) : null}
          <ScrollArea className="h-[75vh] max-w-sm overflow-y-auto rounded-md border-0 mt-[2vh]">
            <div className="w-full px-4">
              {isPhysicalProductsLoading ? (
                <div>Loading...</div>
              ) : (
                physicalProducts.map((physicalProduct: any) => (
                  <ProductPreview
                    key={physicalProduct.sku}
                    sku={physicalProduct.sku}
                    name={physicalProduct.name}
                    mappings={mappings}
                    ean={physicalProduct.ean}
                    getMappings={getMappings}
                    editMapping={editMapping}
                    createMapping={createMapping}
                    deleteMapping={deleteMapping}
                    userMapping={userMapping}
                    setUserMapping={setUserMapping}
                    digital={false}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </section>
      </div>

      <div className="md:hidden flex flex-col items-center w-full">
        <Tabs defaultValue="account" className="max-w-xl w-full">
          <TabsList className="w-full">
            <TabsTrigger value="digital" className="w-full">
              Digital Products
            </TabsTrigger>
            <TabsTrigger value="physical" className="w-full">
              Physical Products
            </TabsTrigger>
          </TabsList>
          <TabsContent value="digital" className="flex flex-col items-center">
            <h2 className="text-xl font-medium">Digital Products</h2>
            <Input className="max-w-sm mt-8" placeholder="Search" />
            <div className="max-w-[22rem] mt-8">
              <ProductPreview />
            </div>
          </TabsContent>
          <TabsContent value="physical" className="flex flex-col items-center">
            <h2 className="text-xl font-medium">Physical Products</h2>
            <Input className="max-w-sm mt-8" placeholder="Search" />
            <div className="max-w-[22rem] mt-8">
              <ProductPreview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default App;
