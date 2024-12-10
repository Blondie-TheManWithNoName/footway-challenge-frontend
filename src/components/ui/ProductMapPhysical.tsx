import { useEffect, useState } from "react";
// prettier-ignore
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, X } from "lucide-react";
import { Button } from "./button";
// Context
import { useMappingsContext } from "@/contexts/MappingContext";
import { useParams } from "react-router-dom";

export default function ProductMapPhysical({ sku, setColor }: any) {
  const [mappedId, setMappedId] = useState<number>(0);
  const { userMapping, mappings, deleteMapping, createMapping } =
    useMappingsContext();
  const { id: orderId } = useParams();

  useEffect(() => {
    if (!userMapping) setMappedId(0);
    else {
      if (mappings) {
        const mapped = mappings?.find(
          (mapping: any) => mapping.physicalProductSku === sku
        );
        if (mapped) setMappedId(mapped.id);
        else setMappedId(0);
      }
    }
  }, [userMapping]);

  // Color Logic
  useEffect(() => {
    if (mappedId) setColor("outline-picked bg-picked2");
    else setColor("bg-default outline-transparent");
  }, [mappedId]);

  async function handleMapClick() {
    if (userMapping) {
      if (mappedId !== 0) {
        deleteMapping(mappedId);
        setMappedId(0);
      } else {
        const id = await createMapping({
          physicalProductSku: sku,
          digitalProductSku: userMapping.sku,
          order: Number(orderId),
        });
        setMappedId(id);
      }
    }
  }

  // const iconVariants = {
  //   remove: <X stroke="#FFFFFF" strokeWidth={1.5} />,
  //   add: <Check stroke="#FFFFFF" strokeWidth={1.5} />,
  //   disabled: null,
  // };

  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={`${
              mappedId ? "default" : userMapping ? "outline" : "ghost"
            }`}
            className="w-full h-full"
            onClick={handleMapClick}
            disabled={!userMapping}
          >
            {mappedId ? (
              <X stroke="#FFFFFF" strokeWidth={1} />
            ) : userMapping ? (
              <Check stroke="#181818" strokeWidth={1.5} />
            ) : undefined}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Map Prodcut</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
