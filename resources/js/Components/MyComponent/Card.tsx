import { Cart, Product, ProductsProps } from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import formatPrice from "@/lib/formatPrice";
import { useAppDispatch } from "@/hooks/useRedux";
import { remove, updateAmount } from "@/slicer/cartSlicer";
import axios from "axios";

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
    const dispatch = useAppDispatch();

    const removeFromCart = () => {
        dispatch(remove({ id: item.id }));
    };

    const addAmount = () => {
        dispatch(updateAmount({ id: item.id, amount: item.amount + 1 }));
    };

    const reduceAmount = () => {
        if (item.amount > 1) {
            dispatch(updateAmount({ id: item.id, amount: item.amount - 1 }));
        }
    };

    return (
        <div className="grid grid-cols-3 gap-5 my-5 md:grid-cols-4">
            <Link
                href={`/detail/${item.product.id}`}
                className="flex items-center justify-center rounded-md bg-[#FCFBF4]"
            >
                <img
                    src={item.product.image}
                    className="w-full aspect-square"
                    alt={item.product.id}
                />
            </Link>
            <div className="flex justify-between col-span-2 gap-2 md:col-span-3">
                <div className="flex flex-col justify-between w-full space-y-1 sm:space-y-3">
                    <Link
                        href={`/detail/${item.product.id}`}
                        className="text-lg font-bold sm:text-xl md:text-2xl"
                    >
                        {item.product.name}
                    </Link>
                    <h1 className="text-lg font-bold sm:hidden">
                        {formatPrice(item.total_price)}
                    </h1>
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
                    <div className="flex items-center justify-between">
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            onClick={removeFromCart}
                        >
                            <Trash />
                        </Button>
                        <div className="sm:hidden h-[40px] gap-5 flex items-center">
                            <button
                                type="button"
                                className={`${
                                    item.amount < 1
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                <MinusCircle onClick={reduceAmount} />
                            </button>
                            <span className="font-bold">{item.amount}</span>
                            <button type="button" onClick={addAmount}>
                                <PlusCircle />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-between hidden sm:flex">
                    <h1 className="font-bold text-end sm:text-xl md:text-2xl">
                        {formatPrice(item.total_price)}
                    </h1>
                    <div className="h-[40px] gap-5 justify-end flex items-center">
                        <button
                            type="button"
                            className={`${
                                item.amount < 1
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}
                        >
                            <MinusCircle onClick={reduceAmount} />
                        </button>
                        <span className="font-bold">{item.amount}</span>
                        <button type="button" onClick={addAmount}>
                            <PlusCircle />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
