import { CartCard } from "@/Components/MyComponent/Card";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import MainLayout from "@/Layouts/MainLayout";
import formatPrice from "@/lib/formatPrice";
import { setCart } from "@/slicer/cartSlicer";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import React, { useEffect, useMemo } from "react";

export default function Cart({ auth }: PageProps) {
    const cartItems = useAppSelector((state) => state.cart.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCart(auth.user.cart));
    }, [auth.user.cart, setCart, dispatch]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, curr) => acc + curr.total_price, 0);
    }, [cartItems]);

    const tax = useMemo(() => {
        return (subtotal * 1) / 10;
    }, [subtotal]);

    const total = useMemo(() => {
        return tax + subtotal;
    }, [subtotal, tax]);

    return (
        <MainLayout user={auth.user}>
            <Head title="Cart" />
            <div className="grid min-h-screen gap-10 py-10 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, i) => (
                            <React.Fragment key={i}>
                                <CartCard item={item} />
                                {i !== cartItems.length - 1 && <Separator />}
                            </React.Fragment>
                        ))
                    ) : (
                        <h1>Anda tidak memiliki barang di keranjang.</h1>
                    )}
                </div>
                <div className="w-full lg:col-span-2">
                    <h1 className="mb-6 text-3xl font-bold">Summary</h1>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <h1 className="text-sm font-bold sm:text-base">
                                Subtotal
                            </h1>
                            <h1 className="text-sm font-bold sm:text-base">
                                {formatPrice(subtotal)}
                            </h1>
                        </div>
                        <div className="flex justify-between">
                            <h1 className="text-sm font-bold sm:text-base">
                                Estimated Delivery & Handling
                            </h1>
                            <h1 className="text-sm font-bold sm:text-base">
                                Free
                            </h1>
                        </div>
                        <div className="flex justify-between">
                            <h1 className="text-sm font-bold sm:text-base">
                                Estimated Taxes
                            </h1>
                            <h1 className="text-sm font-bold sm:text-base">
                                {formatPrice(tax)}
                            </h1>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between mb-4">
                        <h1 className="text-base font-bold sm:text-lg">
                            Total
                        </h1>
                        <h1 className="text-base font-bold sm:text-lg">
                            {formatPrice(total)}
                        </h1>
                    </div>

                    <div className="space-y-2">
                        <Button className="w-full py-6 rounded-full">
                            Checkout Now
                        </Button>
                        <Button
                            className="w-full py-6 border-2 rounded-full"
                            variant={"outline"}
                        >
                            Paypal
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
