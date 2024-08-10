import ClothCard from "@/Components/MyComponent/Card";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

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
                <div className="grid grid-cols-1 gap-5 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </MainLayout>
    );
}
