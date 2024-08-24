import { ProductCard } from "@/Components/MyComponent/Card";
import { Button } from "@/Components/ui/button";
import MainLayout from "@/Layouts/MainLayout";
import { Product, User } from "@/types";
import { Head } from "@inertiajs/react";

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
    return (
        <MainLayout user={auth.user}>
            <Head title="Detail" />
            <div className="grid min-h-screen gap-10 py-10 md:grid-cols-2">
                <div className="space-y-2 ">
                    <div className="rounded-xl active bg-[#FCFBF4]">
                        <img
                            src={`/storage/${product.image}`}
                            alt=""
                            className="w-full max-w-sm mx-auto aspect-square"
                        />
                    </div>
                    {/* <div className="grid grid-cols-4 gap-2">
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
                        </div> */}
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
                            Rp. {product.price}
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
                                        className="py-6 text-xs font-bold uppercase border-black rounded-full md:text-lg"
                                    >
                                        {size}
                                    </Button>
                                ))}
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
                    {recommendation ? (
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
