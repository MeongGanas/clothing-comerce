import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { ProductsProps, User } from "@/types";
import { Head, Link } from "@inertiajs/react";
import {
    ProductFilter,
    ProductTabs,
} from "@/Components/MyComponent/DashboardProduct";

export default function Products({
    auth,
    allProducts,
}: {
    auth: { user: User };
    allProducts: ProductsProps;
}) {
    const activeTab = route().params.type ? route().params.type : "all";

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Products" />
            <Tabs defaultValue={activeTab}>
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all" asChild>
                            <Link
                                className="text-sm sm:text-base"
                                href="/dashboard/products"
                            >
                                All
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="featured" asChild>
                            <Link
                                className="text-sm sm:text-base"
                                href="?type=featured"
                            >
                                Featured
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="archived" asChild>
                            <Link
                                className="text-sm sm:text-base"
                                href="?type=archived"
                            >
                                Archived
                            </Link>
                        </TabsTrigger>
                    </TabsList>
                    <ProductFilter />
                </div>
                <ProductTabs value={activeTab} products={allProducts} />
            </Tabs>
        </DashboardLayout>
    );
}
