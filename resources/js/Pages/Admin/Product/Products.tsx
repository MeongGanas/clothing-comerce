import { File, ListFilter, PlusCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Product, User } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ProductTabs } from "@/Components/MyComponent/DashboardProduct";

export default function Products({
    auth,
    allProducts,
}: {
    auth: { user: User };
    allProducts: Product[];
}) {
    const featuredProducts = allProducts.filter(
        (product) => product.isFeatured
    );
    const archivedProducts = allProducts.filter(
        (product) => product.isArchived
    );

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Products" />
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="featured">Featured</TabsTrigger>
                        <TabsTrigger value="archived">Archived</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2 ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Man
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Women
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Kids
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1"
                        >
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Button size="sm" asChild className="h-8 gap-1">
                            <Link href="/dashboard/products/create">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Product
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
                <ProductTabs value="all" products={allProducts} />
                <ProductTabs value="featured" products={featuredProducts} />
                <ProductTabs value="archived" products={archivedProducts} />
            </Tabs>
        </DashboardLayout>
    );
}
