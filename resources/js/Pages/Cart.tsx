import { CartCard } from "@/Components/MyComponent/Card";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Cart({ auth }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Cart" />
            <div className="grid min-h-screen gap-10 py-10 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
                    <CartCard />
                    <Separator />
                    <CartCard />
                    <Separator />
                    <CartCard />
                </div>
                <div className="w-full lg:col-span-2">
                    <h1 className="mb-6 text-3xl font-bold">Summary</h1>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <h1 className="text-sm font-bold sm:text-base">
                                Subtotal
                            </h1>
                            <h1 className="text-sm font-bold sm:text-base">
                                $191,00
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
                                $21,00
                            </h1>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between mb-4">
                        <h1 className="text-base font-bold sm:text-lg">
                            Total
                        </h1>
                        <h1 className="text-base font-bold sm:text-lg">
                            $212,00
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
