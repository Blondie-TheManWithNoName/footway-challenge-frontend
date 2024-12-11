import { Input } from "../ui/input";
import ProductPreview from "./ProductPreview";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { usePagination } from "@/hooks/usePagination";
import { useParams } from "react-router-dom";

export default function ProductsSection({
  digital,
  products,
  isLoading,
  getProducts,
  recomendation,
}: {
  digital: boolean;
  products: any[];
  isLoading: boolean;
  getProducts: any;
  recomendation?: any;
}) {
  const { id } = useParams();

  const { handleScroll, setSearch, search, setPage } = usePagination({
    id: Number(id),
    digital,
    getProducts,
  });

  return (
    <section className="flex flex-col items-center pt-[6vh]">
      <h2 className="text-xl font-medium">
        {digital ? "Digital" : "Physical"} Products
      </h2>
      <Input
        className="max-w-[25rem] mt-[1vh]"
        placeholder={`Search ${digital ? "digital" : "physical"} products`}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {!digital && recomendation ? (
        <>
          <div className="max-w-sm mt-[2vh] border-2 h-[20vh] border-transparent border-b-violet-800 p-4">
            <h3 className="text-xl font-medium">Recomendation</h3>

            <ProductPreview
              key={"recomendation" + recomendation.sku}
              productInfo={{
                sku: recomendation.sku,
                name: recomendation.name,
                ean: recomendation.ean,
                image: recomendation.image,
              }}
              digital={false}
              map={true}
            />
          </div>
        </>
      ) : null}

      <ScrollArea
        className={`${
          !digital && recomendation ? "h-[35vh]" : "h-[55vh]"
        } max-w-md overflow-y-auto border-0 mt-[2vh]`}
        onScroll={handleScroll}
      >
        <div className="w-full px-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            products.map((product: any) => (
              <ProductPreview
                key={
                  digital
                    ? "digital" + "-" + product.sku
                    : "physical" + "-" + product.sku
                }
                productInfo={{
                  sku: product.sku,
                  name: product.name,
                  ean: product.ean,
                  image: product.image,
                }}
                digital={digital}
                map={true}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </section>
  );
}
