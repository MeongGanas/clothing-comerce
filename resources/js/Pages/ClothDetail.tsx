import { ProductCard } from "@/Components/MyComponent/Card";
import { Button } from "@/Components/ui/button";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Star } from "lucide-react";

export default function ClothDetail({ auth }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Detail" />
            <div className="grid min-h-screen gap-10 py-10 md:grid-cols-5">
                <div className="col-span-3 space-y-2">
                    <div className="rounded-xl active bg-[#FCFBF4]">
                        <img
                            src="/images/baju.png"
                            alt=""
                            className="w-full max-w-sm aspect-[3/3.5] mx-auto"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="cursor-pointer rounded-xl bg-[#FCFBF4]">
                            <img
                                src="/images/baju.png"
                                className="aspect-[3/3.5]"
                                alt=""
                            />
                        </div>
                        <div className="cursor-pointer rounded-xl bg-[#FCFBF4]">
                            <img
                                src="/images/baju.png"
                                className="aspect-[3/3.5]"
                                alt=""
                            />
                        </div>
                        <div className="cursor-pointer rounded-xl bg-[#FCFBF4]">
                            <img
                                src="/images/baju.png"
                                className="aspect-[3/3.5]"
                                alt=""
                            />
                        </div>
                        <div className="cursor-pointer rounded-xl bg-[#FCFBF4]">
                            <img
                                src="/images/baju.png"
                                className="aspect-[3/3.5]"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 space-y-5 md:col-span-2">
                    <div className="space-y-3">
                        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                            Badacore Tshirt
                        </h1>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 font-bold">
                                <Star />
                                (4,9)
                            </div>
                            <span className="text-neutral-300">|</span>
                            <h1 className="font-bold">9,3K Reviews</h1>
                            <span className="text-neutral-300">|</span>
                            <h1 className="font-bold">10K Sold Out</h1>
                        </div>
                        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                            $90
                        </h1>
                        <h4>
                            Color : <span className="font-bold">Cream</span>
                        </h4>
                        <div className="space-y-2">
                            <h4>Size :</h4>
                            <div className="grid grid-cols-4 gap-2">
                                <Button
                                    variant={"outline"}
                                    className="py-6 text-lg font-bold border-black rounded-full"
                                >
                                    XS
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className="py-6 text-lg font-bold border-black rounded-full"
                                >
                                    S
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className="py-6 text-lg font-bold border-black rounded-full"
                                >
                                    M
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className="py-6 text-lg font-bold border-black rounded-full"
                                >
                                    L
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className="py-6 text-lg font-bold border-black rounded-full"
                                >
                                    XL
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className="py-6 text-lg font-bold border-black rounded-full"
                                >
                                    XXL
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Button className="w-full py-6 font-semibold rounded-full">
                                Buy Now
                            </Button>
                            <Button
                                variant={"outline"}
                                className="w-full py-6 font-semibold border-2 rounded-full"
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold">Description</h1>
                        <p className="text-neutral-500">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Iure reprehenderit repellendus debitis porro
                            deserunt aperiam, laudantium ullam iusto temporibus
                            deleniti assumenda, facere asperiores eum optio
                            architecto eaque tenetur praesentium cum! Laudantium
                            molestiae enim, inventore nisi similique fuga!
                            Aliquam, repellat quas.
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-10 space-y-5">
                <h1 className="text-lg font-bold md:text-2xl">
                    You may also like
                </h1>
                <div className="grid grid-cols-1 gap-5 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </MainLayout>
    );
}
