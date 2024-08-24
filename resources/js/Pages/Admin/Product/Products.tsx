import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Product, User } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Products({
    auth,
    products,
}: {
    auth: { user: User };
    products: Product[];
}) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Products" />
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="draft">Draft</TabsTrigger>
                        <TabsTrigger
                            value="archived"
                            className="hidden sm:flex"
                        >
                            Archived
                        </TabsTrigger>
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
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Draft
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
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
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>
                                Manage your products and view their sales
                                performance.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden w-[100px] sm:table-cell">
                                            <span className="sr-only">
                                                Image
                                            </span>
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
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products &&
                                        products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="hidden sm:table-cell">
                                                    <img
                                                        alt={product.name}
                                                        className="object-cover rounded-md aspect-square"
                                                        height="64"
                                                        src={`/storage/${product.image}`}
                                                        width="64"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {product.name}
                                                </TableCell>
                                                <TableCell>
                                                    {product.stocks}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    Rp. {product.price}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    25
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {product.created_at}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
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
                                                            <DropdownMenuItem>
                                                                Edit
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
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>1-10</strong> of{" "}
                                <strong>32</strong> products
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
}
