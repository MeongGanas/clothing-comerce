import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const sizes = [
    {
        id: "xs",
        label: "XS",
    },
    {
        id: "s",
        label: "S",
    },
    {
        id: "m",
        label: "M",
    },
    {
        id: "l",
        label: "L",
    },
    {
        id: "xl",
        label: "XL",
    },
    {
        id: "xxl",
        label: "XXL",
    },
] as const;

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    product: z.string(),
    isFeatured: z.boolean(),
    isArchived: z.boolean(),
    color: z.string(),
    price: z.string(),
    stocks: z.string(),
    caption: z.string(),
    available_size: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
        }),
    image: z
        .instanceof(FileList)
        .refine((file) => file?.length == 1, "File is required."),
});

type ProductSchema = z.infer<typeof productSchema>;

export default function AddProduct({ auth }: PageProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            product: "",
            isFeatured: false,
            isArchived: false,
            available_size: ["s", "m"],
            caption: "",
            color: "",
            price: "",
            stocks: "",
        },
    });

    const { handleSubmit, control } = form;

    const fileRef = form.register("image");

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("stocks", values.stocks);
        formData.append("category", values.category);
        formData.append("product", values.product);
        formData.append("isFeatured", values.isFeatured.toString());
        formData.append("isArchived", values.isArchived.toString());
        formData.append("color", values.color);
        formData.append("price", values.price);
        formData.append("caption", values.caption);
        formData.append(
            "available_size",
            JSON.stringify(values.available_size)
        );
        formData.append("name", values.name);
        formData.append("image", values.image[0]);

        const promise = axios.post("/dashboard/products", formData);

        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                console.log(res);
                setIsSubmitted(false);
                window.location.replace("/dashboard/products");
                return "Add Product Success!";
            },
            error: (err) => {
                console.log(err);
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });

        setIsSubmitted(false);
    });

    const handlePreview = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Add Product" />
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Add Products</CardTitle>
                    <CardDescription>
                        Add your new product by filling the field below.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={submit}>
                        <CardContent>
                            <FormField
                                control={control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Product Image</FormLabel>
                                        {preview && (
                                            <img
                                                src={preview}
                                                className="w-60"
                                                alt=""
                                            />
                                        )}
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                required
                                                {...fileRef}
                                                onChange={(e) =>
                                                    handlePreview(e)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid items-start gap-5 my-5 sm:grid-cols-2 md:grid-cols-4">
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Category
                                                        </SelectLabel>
                                                        <SelectItem value="man">
                                                            Man
                                                        </SelectItem>
                                                        <SelectItem value="women">
                                                            Women
                                                        </SelectItem>
                                                        <SelectItem value="kids">
                                                            Kids
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="product"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Product</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a product" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Product
                                                        </SelectLabel>
                                                        <SelectItem value="tshirt">
                                                            Tshirt
                                                        </SelectItem>
                                                        <SelectItem value="jacket">
                                                            Jacket
                                                        </SelectItem>
                                                        <SelectItem value="pants">
                                                            Pants
                                                        </SelectItem>
                                                        <SelectItem value="tuxedo">
                                                            Tuxedo
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Color</FormLabel>
                                            <FormControl>
                                                <Input required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="stocks"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Stocks</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isFeatured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row p-4 items-center space-y-0 border rounded-md has-[:checked]:bg-blue-50">
                                            <FormLabel className="flex flex-row justify-center w-full cursor-pointer">
                                                <FormControl>
                                                    <Input
                                                        type="checkbox"
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        className="hidden"
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Is Featured
                                                    </FormLabel>
                                                    <FormDescription>
                                                        this will be show as new
                                                        product.
                                                    </FormDescription>
                                                </div>
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isArchived"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row p-4 items-center space-y-0 border rounded-md has-[:checked]:bg-blue-50">
                                            <FormLabel className="flex flex-row justify-center w-full cursor-pointer">
                                                <FormControl>
                                                    <Input
                                                        type="checkbox"
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        className="hidden"
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Is Archived
                                                    </FormLabel>
                                                    <FormDescription>
                                                        this will be hide your
                                                        product.
                                                    </FormDescription>
                                                </div>
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-5">
                                <FormField
                                    control={control}
                                    name="available_size"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>
                                                Available Size
                                            </FormLabel>
                                            <div className="grid grid-cols-7">
                                                {sizes.map((size) => (
                                                    <FormField
                                                        key={size.id}
                                                        control={form.control}
                                                        name="available_size"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={
                                                                        size.id
                                                                    }
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(
                                                                                size.id
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              size.id,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          field.value?.filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  size.id
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {
                                                                            size.label
                                                                        }
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-5 md:grid-cols-2">
                                <FormField
                                    control={control}
                                    name="caption"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Caption</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    required
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    required
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-4">
                            <Button
                                asChild
                                variant={"outline"}
                                disabled={isSubmitted}
                            >
                                <Link href="/dashboard/products">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isSubmitted}>
                                Add Now
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </DashboardLayout>
    );
}
