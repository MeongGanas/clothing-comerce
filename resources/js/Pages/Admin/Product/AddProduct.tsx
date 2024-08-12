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
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    size: z.string(),
    category: z.string(),
    product: z.string(),
    isFeatured: z.boolean(),
    isArchived: z.boolean(),
    color: z.string(),
    price: z.string(),
    image: z.string(),
});

type ProductSchema = z.infer<typeof productSchema>;

export default function AddProduct({ auth }: PageProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            size: "",
            category: "",
            product: "",
            isFeatured: false,
            isArchived: false,
            color: "",
            price: "",
            image: "",
        },
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        console.log(values);
        // setIsSubmitted(true);

        // const promise = axios.post("/login", values);

        // toast.promise(promise, {
        //     loading: "Loading...",
        //     success: () => {
        //         setIsSubmitted(false);
        //         window.location.replace("/");
        //         return "Login Success!";
        //     },
        //     error: (err) => {
        //         console.log(err);
        //         setIsSubmitted(false);
        //         return "Something went wrong";
        //     },
        // });
    });

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
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                required
                                                {...field}
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
                                    name="size"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Size</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a size" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Size
                                                        </SelectLabel>
                                                        <SelectItem value="xs">
                                                            XS
                                                        </SelectItem>
                                                        <SelectItem value="s">
                                                            S
                                                        </SelectItem>
                                                        <SelectItem value="m">
                                                            M
                                                        </SelectItem>
                                                        <SelectItem value="l">
                                                            L
                                                        </SelectItem>
                                                        <SelectItem value="xl">
                                                            XL
                                                        </SelectItem>
                                                        <SelectItem value="xxl">
                                                            XXL
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
                                                        <SelectItem value="men">
                                                            Men
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
                                                        <SelectItem value="shoes">
                                                            Shoes
                                                        </SelectItem>
                                                        <SelectItem value="pants">
                                                            Pants
                                                        </SelectItem>
                                                        <SelectItem value="sunglasses">
                                                            Sunglasses
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
                        </CardContent>
                        <CardFooter>
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
