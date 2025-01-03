import { useState } from "react";

import ProductInfo from "./ProductInfo";
import ProductMapDigital from "./ProductMapDigital";
import ProductMapPhysical from "./ProductMapPhysical";
import { ProductPreviewInterface } from "@/interfaces/ProductPreviewInterface";
import { usePhysicalProduct } from "@/hooks/usePhysicalProduct";
import { useDigitalProduct } from "@/hooks/useDigitalProduct";

export default function ProductPreview({
  productInfo,
  digital,
  map = true,
}: {
  productInfo: ProductPreviewInterface;
  digital: boolean;
  map: boolean;
}) {
  const [color, setColor] = useState<string>("bg-transparent");
  const { name, sku, ean, image } = productInfo;

  const {
    physicalProduct,
    getPhysicalProduct,
    editPhysicalProduct,
    deletePhysicalProduct,
  } = usePhysicalProduct();

  const {
    digitalProduct,
    getDigitalProduct,
    editDigitalProduct,
    deleteDigitalProduct,
  } = useDigitalProduct();

  return (
    <div
      // transition-all duration-50 cubic-bezier(0.22, 1, 0.36, 1)
      className={`grid grid-cols-[21%_55%_20%] gap-x-[2%] 
        outline outline-[2px] 
         pt-2 pb-2 px-2 overflow-hidden mt-3 relative
        ${color}
        ${map ? null : "outline-transparent"}
        `}
    >
      <img
        src={image ?? "/fallback.jpg"}
        alt="shoes"
        className="w-full aspect-square"
      />
      <div className="flex flex-col justify-between pb-0 relative">
        <h3 className="text-md font-medium leading-tight line-clamp-1">
          {name}
        </h3>
        <div className="mt-2.5 grid grid-rows-2 gap-y-2 w-full py-2">
          <p className="text-sm tracking-wide leading-none  font-mono">
            <span className="font-medium">SKU: </span>
            {sku}
          </p>
          <p className="text-sm tracking-wide leading-none font-mono">
            <span className="font-medium">EAN: </span>
            {ean ? ean : "-"}
          </p>
        </div>
      </div>
      <div
        className={`grid ${
          map ? "grid-rows-[41%_44%]" : "grid-rows-1"
        }   relative items-center gap-y-[15%]`}
      >
        <ProductInfo
          sku={sku}
          product={digital ? digitalProduct : physicalProduct}
          getProduct={digital ? getDigitalProduct : getPhysicalProduct}
          editProduct={digital ? editDigitalProduct : editPhysicalProduct}
          deleteProduct={digital ? deleteDigitalProduct : deletePhysicalProduct}
        />
        {map &&
          (digital ? (
            <ProductMapDigital sku={sku} ean={ean} setColor={setColor} />
          ) : (
            <ProductMapPhysical sku={sku} setColor={setColor} />
          ))}
      </div>
    </div>
  );
}
