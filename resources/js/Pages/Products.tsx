import { AllProductCards } from "@/Components/MyComponent/Card";
import MainLayout from "@/Layouts/MainLayout";
import { ProductsProps, User } from "@/types";
import { Head, Link } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Button } from "@/Components/ui/button";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { setCart } from "@/slicer/cartSlicer";

export default function Home({
    auth,
    products,
}: {
    auth: { user: User };
    products: ProductsProps;
}) {
    const dispatch = useAppDispatch();
    const category = route().params.category;

    useEffect(() => {
        if (auth.user) {
            dispatch(setCart(auth.user.cart));
        }
    }, [auth.user]);

    return (
        <MainLayout user={auth.user}>
            <Head title="Home" />
            <div className="py-20">
                <div className="flex justify-center mb-10">
                    <div className="md:max-w-[500px]">
                        <h1 className="text-4xl font-bold text-center uppercase">
                            All {category ? category : "Clothing"} Collection
                        </h1>
                        <p className="my-3 text-sm font-semibold text-center text-muted-foreground">
                            Find anything you need to look and feel your best,
                            and shop the latest fashion and lifestyle product
                        </p>
                        <FilterProducts />
                    </div>
                </div>
                <AllProductCards products={products} />
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={products.links[0].url || ""}
                            />
                        </PaginationItem>
                        {products &&
                            products.links.slice(1, -1).map((link, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href={link.url || ""}
                                        isActive={link.active}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        <PaginationItem>
                            <PaginationNext
                                href={
                                    products.links[products.links.length - 1]
                                        .url || ""
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </MainLayout>
    );
}

function FilterProducts() {
    const params = route().params;

    const backToAll = params.category
        ? `${window.location.pathname}?category=${params.category}`
        : "/";

    const nextParameter = params.category
        ? `${window.location.pathname}?category=${params.category}&`
        : "?";

    return (
        <div className="grid grid-cols-4 gap-5 sm:grid-cols-5">
            <Button
                variant={"outline"}
                className="py-6 text-xs font-bold border-black rounded-full sm:text-base min-w-16 sm:min-w-20"
                asChild
            >
                <Link href={`${backToAll}`}>All</Link>
            </Button>
            <Button
                variant={"outline"}
                className="col-span-2 py-6 text-xs font-bold border-black rounded-full sm:col-span-1 sm:text-base min-w-16 sm:min-w-20"
                asChild
            >
                <Link href={`${nextParameter}product=tshirt`}>Tshirt</Link>
            </Button>
            <Button
                variant={"outline"}
                className="py-6 text-xs font-bold border-black rounded-full sm:text-base min-w-16 sm:min-w-20"
                asChild
            >
                <Link href={`${nextParameter}product=pants`}>Pants</Link>
            </Button>
            <Button
                variant={"outline"}
                className="col-span-2 py-6 text-xs font-bold border-black rounded-full sm:col-span-1 sm:text-base min-w-16 sm:min-w-20"
                asChild
            >
                <Link href={`${nextParameter}product=jacket`}>Jacket</Link>
            </Button>
            <Button
                variant={"outline"}
                className="col-span-2 py-6 text-xs font-bold border-black rounded-full sm:col-span-1 sm:text-base min-w-16 sm:min-w-20"
                asChild
            >
                <Link href={`${nextParameter}product=tuxedo`}>Tuxedo</Link>
            </Button>
        </div>
    );
}
