import { useOrders } from "@/hooks/useOrders";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductPreview from "./ProductPreview";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Order() {
  const { getOrder, order } = useOrders();
  const { id } = useParams();

  useEffect(() => {
    getOrder(Number(id));
  }, [id]);

  return (
    <section className="flex flex-col items-center justify-between w-full px-8">
      <div className="col-span-2 grid grid-cols-2 gap-x-10 px-10 w-full pt-16">
        <h1 className="text-center text-xl col-span-2 font-medium uppercase">
          ORDER #{id}
        </h1>
        <Link
          to={`/orders`}
          className="text-violet-800 flex flex-row items-center text-sm px-4 py-1 w-24 transition-colors border-[1.5px] border-violet-800 text-center hover:bg-violet-50 hover:text-violet-900"
        >
          <ChevronLeft className="w-5" />
          <p>Back</p>
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-x-10 max-w-[80rem] px-10 mt-20">
        <h2 className="text-left w-full lg:col-span-3 md:col-span-2 sm:col-span-1 pl-2 text-violet-800">
          Ordered Products
        </h2>
        {order
          ? order.digitalProductsLinks?.map((digitalProduct: any) => (
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
          : null}
      </div>

      <Link
        to={`/orders/${id}/mapping`}
        className="text-white flex flex-row items-center text-sm px-4 py-1 w-36 whitespace-nowrap border-[1.5px] transition-colors border-violet-800 text-center bg-violet-400 hover:bg-violet-100/90 hover:text-white absolute bottom-12 right-20"
      >
        <p>Map Products</p>
        <ChevronRight className="w-5" />
      </Link>
    </section>
  );
}
