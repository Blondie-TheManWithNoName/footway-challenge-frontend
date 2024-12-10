// prettier-ignore
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoveHorizontal } from "lucide-react";
import { Button } from "./button";
// Context
import { useMappingsContext } from "@/contexts/MappingContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductMapDigital({ sku, ean, setColor }: any) {
  const { userMapping, getMappings, setUserMapping } = useMappingsContext();

  const { id: orderId } = useParams();

  async function handleMapClick() {
    await getMappings({ sku, orderId: Number(orderId) });
    setUserMapping(userMapping ? undefined : { sku: sku, ean: ean });
  }

  // Color Logic
  useEffect(() => {
    if (userMapping?.sku === sku) setColor("outline-picked bg-picked2");
    else setColor("bg-default outline-transparent");
  }, [userMapping]);

  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            className="w-full h-full"
            onClick={handleMapClick}
            disabled={userMapping !== undefined && userMapping.sku !== sku}
          >
            <MoveHorizontal
              stroke="#FFFFFF"
              strokeWidth={1.5}
              scale={4}
              className="w-10 h-full"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Map Prodcut</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
