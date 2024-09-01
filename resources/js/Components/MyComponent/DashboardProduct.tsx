import { File, ListFilter, PlusCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { TabsContent } from "../ui/tabs";
import { ProductsProps } from "@/types";
import formatPrice from "@/lib/formatPrice";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";

export function ProductTabs({
    products,
    value,
}: {
    products: ProductsProps;
    value: string;
}) {
    return (
        <TabsContent value={value}>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle className="capitalize">
                        {value} Products
                    </CardTitle>
                    <CardDescription>
                        Manage your products and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Stocks</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Price
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Total Sales
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Created at
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data &&
                                products.data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <img
                                                alt={product.name}
                                                className="object-cover rounded-md aspect-square"
                                                height="64"
                                                src={product.image}
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>{product.stocks}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {formatPrice(product.price)}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            25
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {product.created_at}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                        <span className="sr-only">
                                                            Toggle menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        asChild
                                                        className="cursor-pointer"
                                                    >
                                                        <Link
                                                            href={`/dashboard/products/${product.id}/edit`}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        asChild
                                                        className="cursor-pointer"
                                                    >
                                                        <Link
                                                            href={`/dashboard/products/${product.id}`}
                                                            method="delete"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="w-full space-y-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={products.links[0].url || ""}
                                    />
                                </PaginationItem>
                                {products &&
                                    products.links
                                        .slice(1, -1)
                                        .map((link, i) => (
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
                                            products.links[
                                                products.links.length - 1
                                            ].url || ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of{" "}
                            <strong>{products.data.length}</strong> products
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </TabsContent>
    );
}

export function ProductFilter() {
    const params = route().params;
    const allRoute = params.type
        ? `${window.location.pathname}?type=${params.type}`
        : `${window.location.pathname}`;

    const nextRoute = params.type
        ? `${window.location.pathname}?type=${params.type}&`
        : `${window.location.pathname}?`;

    return (
        <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={allRoute}>
                        <DropdownMenuCheckboxItem
                            checked={params.category === undefined}
                        >
                            All
                        </DropdownMenuCheckboxItem>
                    </Link>
                    <Link href={`${nextRoute}category=men`}>
                        <DropdownMenuCheckboxItem
                            checked={params.category === "men"}
                        >
                            Men
                        </DropdownMenuCheckboxItem>
                    </Link>
                    <Link href={`${nextRoute}category=women`}>
                        <DropdownMenuCheckboxItem
                            checked={params.category === "women"}
                        >
                            Women
                        </DropdownMenuCheckboxItem>
                    </Link>
                    <Link href={`${nextRoute}category=kids`}>
                        <DropdownMenuCheckboxItem
                            checked={params.category === "kids"}
                        >
                            Kids
                        </DropdownMenuCheckboxItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
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
    );
}
