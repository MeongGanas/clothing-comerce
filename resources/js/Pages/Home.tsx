import ProductCard from "@/Components/MyComponent/Card";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Home({ auth }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Home" />
            <div className="py-20">
                <div className="flex justify-center mb-10">
                    <div className="md:max-w-[500px]">
                        <h1 className="text-4xl font-bold text-center uppercase">
                            All Clothing Collection
                        </h1>
                        <p className="my-3 text-sm font-semibold text-center text-muted-foreground">
                            Find anything you need to look and feel your best,
                            and shop the latest fashion and lifestyle product
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </MainLayout>
    );
}
