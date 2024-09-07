import { ProductCard } from "@/Components/MyComponent/Card";
import { Button } from "@/Components/ui/button";
import { useAppDispatch } from "@/hooks/useRedux";
import MainLayout from "@/Layouts/MainLayout";
import formatPrice from "@/lib/formatPrice";
import { add, setCart } from "@/slicer/cartSlicer";
import { Product, User } from "@/types";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetail({
    auth,
    product,
    recommendation,
}: {
    auth: { user: User };
    product: Product;
    recommendation: Product[];
}) {
    const sizes = JSON.parse(product.available_size);

    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [amount, setAmount] = useState(1);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (auth.user) {
            dispatch(setCart(auth.user.cart));
        }
    }, [auth.user]);

    const buyNow = () => {};

    const addToCart = () => {
        if (auth.user) {
            const item = {
                user_id: auth.user.id,
                product_id: product.id,
                product: { ...product },
                selected_size: selectedSize,
                amount: amount,
                total_price: product.price * amount,
            };
            axios.post("/cart", item);
            dispatch(add(item));
            toast.success("Add to Cart Success!");
        } else {
            window.location.replace("/login");
        }
    };

    function AddProductAmount(
        setAmount: (amount: number) => void,
        amount: number
    ) {
        setAmount(amount + 1);
    }

    function ReduceProductAmount(
        setAmount: (amount: number) => void,
        amount: number
    ) {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    }

    return (
        <MainLayout user={auth.user}>
            <Head title="Detail" />
            <div className="grid min-h-screen gap-10 py-10 md:grid-cols-2">
                <div className="space-y-2 ">
                    <div className="rounded-xl active bg-[#FCFBF4]">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-w-sm mx-auto aspect-square"
                        />
                    </div>
                </div>
                <div className="space-y-5">
                    <div className="space-y-3">
                        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
                            {product.name}
                        </h1>
                        <p className="text-xs sm:text-base text-neutral-500">
                            {product.caption}
                        </p>
                        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
                            {formatPrice(product.price)}
                        </h1>
                        <h4>
                            Color :{" "}
                            <span className="font-bold capitalize">
                                {product.color}
                            </span>
                        </h4>
                        <div className="space-y-2">
                            <h4>Size :</h4>
                            <div className="grid grid-cols-4 gap-2">
                                {sizes.map((size: string) => (
                                    <Button
                                        key={size}
                                        variant={"outline"}
                                        value={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-6 text-xs font-bold uppercase border-black rounded-full md:text-lg ${
                                            selectedSize === size
                                                ? "bg-blue-50"
                                                : ""
                                        }`}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="h-[40px] gap-5 justify-end flex items-center">
                            <button
                                type="button"
                                onClick={() =>
                                    ReduceProductAmount(setAmount, amount)
                                }
                            >
                                <MinusCircle />
                            </button>
                            <span className="font-bold">{amount}</span>
                            <button
                                type="button"
                                onClick={() =>
                                    AddProductAmount(setAmount, amount)
                                }
                            >
                                <PlusCircle />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <Button
                                className="w-full py-6 font-semibold rounded-full"
                                onClick={buyNow}
                            >
                                Buy Now
                            </Button>
                            <Button
                                variant={"outline"}
                                onClick={addToCart}
                                className="w-full py-6 font-semibold border-2 rounded-full"
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold">Description</h1>
                        <p className="text-neutral-500">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-10 space-y-5">
                <h1 className="text-lg font-bold md:text-2xl">
                    You may also like
                </h1>
                <div className="grid grid-cols-1 gap-5 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {recommendation.length > 0 ? (
                        recommendation.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <h1 className="col-span-4">
                            Belum ada product yang memiliki ciri-ciri yang sama.
                        </h1>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
