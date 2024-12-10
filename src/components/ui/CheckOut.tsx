import { useMappings } from "@/hooks/useMappings";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function CheckOut() {
  const { getMappings, mappings, isLoading } = useMappings();

  const { id } = useParams();

  useEffect(() => {
    getMappings({ orderId: Number(id) });
  }, []);

  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="col-span-2 grid grid-cols-2 gap-x-10 px-10 w-full pt-16">
        <h1 className="text-center text-xl col-span-2 font-medium uppercase">
          Check Out
        </h1>
        <Link
          to={`/orders/${id}/mapping`}
          className="text-violet-800 flex flex-row items-center text-sm px-4 py-1 w-24 transition-colors border-[1.5px] border-violet-800 text-center hover:bg-violet-50 hover:text-violet-900"
        >
          <ChevronLeft className="w-5" />
          <p>Back</p>
        </Link>
      </div>

      <div className="flex flex-col gap-x-10 max-w-[80rem] px-10 pt-10 gap-y-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h2 className="w-full text-violet-800 text-center font-medium mb-6">
              Mapped Products
            </h2>
            {mappings.map((mapping: any) => (
              <div
                key={"mapping" + mapping.id}
                className="flex flex-row gap-x-10"
              >
                <p className="w-20 flex flex-col items-center">
                  {mapping.physicalProductSku}
                </p>
                <p>-</p>
                <p className="w-20 flex flex-col items-center">
                  {mapping.digitalProductSku}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
      <Link
        to={`/`}
        className="text-white flex flex-row items-center text-sm px-4 py-1 w-32 whitespace-nowrap border-[1.5px] transition-colors border-violet-800 text-center bg-violet-400 hover:bg-violet-100/90 hover:text-white absolute bottom-12 right-20"
      >
        <p>Check Out</p>
        <ChevronRight className="w-5" />
      </Link>
    </section>
  );
}
