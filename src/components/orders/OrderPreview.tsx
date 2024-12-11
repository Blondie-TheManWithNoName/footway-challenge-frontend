import { OrderPreviewInterface } from "@/interfaces/OrderPreviewInterface";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderPreview({
  id,
  digitalProductsCount: count,
  href,
}: OrderPreviewInterface) {
  return (
    <div className="w-full flex flex-row gap-x-1.5 relative">
      <div className="flex flex-row items-center justify-between w-full py-3 px-8 border border-violet-800">
        <p className="font-mono">{id}</p>
        <div className="flex flex-row items-center gap-x-4">
          <p>{count}</p>
        </div>
      </div>
      <Link
        to={href}
        className="text-violet-800 px-4 items-center justify-center flex flex-col bg-violet-400 hover:bg-violet-100/90 transition-colors"
      >
        <SquareArrowOutUpRight width={16} height={16} color="white" />
      </Link>
    </div>
  );
}
