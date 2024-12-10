import { usePhysicalProduct } from "./hooks/usePhysicalProduct";
import { useEffect } from "react";
import { useMappingsContext } from "./contexts/MappingContext";
import { useDigitalProduct } from "./hooks/useDigitalProduct";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductsSection from "./components/ui/ProductSection";
export default function Mapping() {
  // Mapping Context
  const { userMapping } = useMappingsContext();
  const { id } = useParams();

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
    getOrderDigitalProducts,
  } = useDigitalProduct();

  useEffect(() => {
    if (userMapping) {
      getRecomendation(userMapping.ean);
    } else setRecomendation(undefined);
  }, [userMapping]);

  return (
    <div className="md:grid grid-cols-2 w-full">
      <div className="col-span-2 grid grid-cols-2 gap-x-10 px-10 w-full pt-16">
        <h1 className="text-center text-xl col-span-2 font-medium uppercase">
          Mapping Order #{id}
        </h1>
        <Link
          to={`/orders/${id}`}
          className="text-sm text-violet-800 flex flex-row items-center px-4 py-1 w-24 border-[1.5px] transition-colors border-violet-800 text-center hover:bg-violet-50 hover:text-violet-900"
        >
          <ChevronLeft className="w-5" />
          <p>Back</p>
        </Link>
      </div>

      <ProductsSection
        digital={true}
        products={digitalProducts}
        isLoading={isDigitalProductsLoading}
        getProducts={getOrderDigitalProducts}
      />

      <ProductsSection
        digital={false}
        products={physicalProducts}
        isLoading={isPhysicalProductsLoading}
        getProducts={getPhysicalProducts}
        recomendation={recomendation}
      />

      <Link
        to={`/orders/${id}/checkout`}
        className="text-sm text-white flex flex-row items-center px-4 py-1 max-w-40 border-[1.5px] transition-colors border-violet-800 text-center bg-violet-400 hover:bg-violet-100/90 hover:text-white absolute bottom-12 right-20"
      >
        <p>Check Out</p>
        <ChevronRight className="w-5" />
      </Link>
    </div>
  );
}
