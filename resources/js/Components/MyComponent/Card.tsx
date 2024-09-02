import { Cart, Product, ProductsProps } from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";
import { Heart, MinusCircle, PlusCircle, Trash } from "lucide-react";
import formatPrice from "@/lib/formatPrice";

export function AllProductCards({ products }: { products: ProductsProps }) {
    return (
        <>
            {products.data.length > 0 ? (
                <div className="grid grid-cols-2 mb-10 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <h1 className="mb-10 text-center">
                    There are no product available.
                </h1>
            )}
        </>
    );
}

export function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/detail/${product.id}`}
            className="w-full max-w-xs mx-auto space-y-4"
        >
            <div className="overflow-hidden bg-[#FCFBF4] rounded-2xl">
                <img src={product.image} className="aspect-square" alt="" />
            </div>
            <div className="flex flex-col justify-between">
                <h1 className="font-bold md:text-lg lg:text-xl sm:min-h-16">
                    {product.name}
                </h1>
                <div className="mt-1 space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        {product.caption} |{" "}
                        <span className="capitalize">{product.category}</span>
                    </p>
                    <h1 className="text-xl font-bold sm:text-2xl">
                        {formatPrice(product.price)}
                    </h1>
                </div>
            </div>
        </Link>
    );
}

export function CartCard({ item }: { item: Cart }) {
    return (
        <div className="grid grid-cols-3 gap-5 my-5 md:grid-cols-4">
            <Link
                href={`/detail/${item.product.id}`}
                className="flex items-center justify-center col-span-1 rounded-md bg-[#FCFBF4]"
            >
                <img
                    src={item.product.image}
                    className="w-full aspect-square"
                    alt={item.product.id}
                />
            </Link>
            <div className="flex justify-between col-span-2 md:col-span-3">
                <div className="flex flex-col justify-between space-y-3">
                    <Link
                        href={`/detail/${item.product.id}`}
                        className="mb-2 text-lg font-bold sm:text-xl md:text-2xl"
                    >
                        {item.product.name}
                    </Link>
                    <div className="text-sm text-gray-400 md:text-base">
                        <h4 className="capitalize">
                            Product: {item.product.product}
                        </h4>
                        <h4 className="capitalize">
                            Size: {item.selected_size}
                        </h4>
                        <h4 className="capitalize">
                            Color: {item.product.color}
                        </h4>
                    </div>
                    <div className="flex items-center">
                        <Button size={"icon"} variant={"ghost"}>
                            <Heart />
                        </Button>
                        <Button size={"icon"} variant={"ghost"}>
                            <Trash />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <h1 className="text-lg font-bold text-end sm:text-xl md:text-2xl">
                        {formatPrice(item.total_price)}
                    </h1>
                    <div className="h-[40px] gap-5 justify-end flex items-center">
                        <button type="button">
                            <MinusCircle />
                        </button>
                        <span className="font-bold">{item.amount}</span>
                        <button type="button">
                            <PlusCircle />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
