import { CrossIcon, SquareX, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useOrders } from "@/hooks/useOrders";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  digitalProductsSkus: z
    .array(z.string().min(1, "SKU is required"))
    .nonempty("At least one SKU is required"),
});

export default function OrderForm({ setOpen }: any) {
  const { createOrder } = useOrders();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createOrder(values.digitalProductsSkus);
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      digitalProductsSkus: [""],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-4 px-0"
      >
        <FormField
          control={form.control}
          name="digitalProductsSkus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digital Product SKUs</FormLabel>
              <FormControl>
                <div className="space-y-2 max-w-56">
                  {field.value.map((sku: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={sku}
                        onChange={(e) => {
                          const newSkus = [...field.value];
                          newSkus[index] = e.target.value;
                          field.onChange(newSkus);
                        }}
                        placeholder="Enter SKU"
                      />
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => {
                          const newSkus = [...field.value];
                          newSkus.splice(index, 1);
                          field.onChange(newSkus);
                        }}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => field.onChange([...field.value, ""])}
                  >
                    Add SKU
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row sm:justify-between w-full col-span-2 mt-8">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="default" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
