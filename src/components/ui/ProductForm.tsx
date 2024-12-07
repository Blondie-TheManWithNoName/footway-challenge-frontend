import React from "react";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./input";
import { Button } from "./button";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SizeEnum } from "@/enums/SizeEnum";
import { ColorEnum } from "@/enums/ColorEnum";
import { usePhysicalProduct } from "@/hooks/usePhysicalProduct";

const formSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(50)
    .refine((val) => val.length > 0, {
      message: "Name is required",
    }),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format")
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0.01 && val <= 10000, {
      message: "Price must be between 0.01 and 10000",
    }),
  description: z
    .string()
    .min(1)
    .max(500)
    .refine((val) => val.length > 0, {
      message: "Description is required",
    }),
  ean: z.string().min(13).max(13),
  sku: z.string().min(2).max(13),
  color: z.nativeEnum(ColorEnum, { message: "Invalid color" }),
  size: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce
      .number()
      .int()
      .min(SizeEnum.SMALL_SIZE)
      .max(SizeEnum.BIG_SIZE)
      .optional()
  ),
});

export default function ProductForm({
  product,
  setEdit,
  editProduct,
}: {
  product: any;
  setEdit: any;
  editProduct: any;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price.toString(),
      description: product?.description,
      ean: product?.ean,
      sku: product?.sku,
      color: product?.color,
      size: product?.size,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editProduct(product.sku, values);
    setEdit(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-10 gap-y-4 px-0"
      >
        <div className="col-span-2 grid grid-cols-[70%_25%] justify-between mt-4 gap-x-[5%]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground text-base">$</span>
                    </div>
                    <Input
                      {...field}
                      min={0}
                      max={10000}
                      step={1}
                      placeholder="0.00"
                      className="pl-9"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-20"
                  style={{ resize: "none" }}
                  {...field}
                  placeholder="Description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input
                  disabled={true}
                  {...field}
                  placeholder="ABC-123"
                  className="font-mono"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ean"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EAN</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="1234567890123"
                  className="font-mono"
                />
              </FormControl>
              <FormDescription>EAN is not required</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {/* <SelectTrigger className="max-w-28"> */}
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(ColorEnum).map((key) => (
                      <SelectItem
                        key={key}
                        value={ColorEnum[key as keyof typeof ColorEnum]}
                      >
                        {ColorEnum[key as keyof typeof ColorEnum]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  value={field.value?.toString()}
                  onValueChange={field.onChange}
                >
                  {/* <SelectTrigger className="max-w-20"> */}
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({
                      length: SizeEnum.BIG_SIZE - SizeEnum.SMALL_SIZE + 1,
                    }).map((_, i) => (
                      <SelectItem
                        key={i + SizeEnum.SMALL_SIZE}
                        value={(i + SizeEnum.SMALL_SIZE).toString()}
                      >
                        {i + SizeEnum.SMALL_SIZE}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row sm:justify-between w-full col-span-2 mt-8">
          <Button variant="outline" onClick={() => setEdit(false)}>
            Cancel
          </Button>
          <Button variant="default" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
