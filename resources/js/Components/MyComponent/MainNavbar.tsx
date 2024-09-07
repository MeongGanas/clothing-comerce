import { Link } from "@inertiajs/react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Input } from "../ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Product, User } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { setCart } from "@/slicer/cartSlicer";
import { Inertia } from "@inertiajs/inertia";

export default function MainNavbar({ user }: { user: User }) {
    const cartItems = useAppSelector((state) => state.cart.value);
    const dispatch = useAppDispatch();

    const logout = () => {
        Inertia.post(
            route("logout"),
            {},
            {
                onSuccess: () => {
                    dispatch(setCart([]));
                },
            }
        );
    };

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 gap-4 px-4 border-b bg-background md:px-6">
            <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <NavLink name="New Arival" activeParams="" link="" />
                <NavLink name="Men" activeParams="men" link="?category=men" />
                <NavLink
                    name="Women"
                    activeParams="women"
                    link="?category=women"
                />
                <NavLink
                    name="Kids"
                    activeParams="kids"
                    link="?category=kids"
                />
            </nav>
            <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-lg"
            >
                <span>MyBrand</span>
            </Link>
            <div className="flex items-center justify-end md:w-[243px]">
                <SearchDialog />
                <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className="relative mr-2"
                >
                    <Link href="/cart">
                        <ShoppingCart
                            className="text-muted-foreground"
                            size={20}
                        />
                        {cartItems.length > 0 && (
                            <Badge className="absolute flex items-center justify-center w-5 h-5 ml-auto rounded-full -top-1 -right-2 shrink-0">
                                {cartItems.length}
                            </Badge>
                        )}
                    </Link>
                </Button>
                <NavbarSheet />
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="mx-2 overflow-hidden rounded-full"
                            >
                                <img
                                    src="/images/placeholder.jpg"
                                    alt="placeholder"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                {user.first_name}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {user.role === "admin" && (
                                <DropdownMenuItem
                                    asChild
                                    className="cursor-pointer"
                                >
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            {user.role === "customer" && (
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={logout}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild variant={"ghost"}>
                        <Link
                            href="/login"
                            className="transition-colors text-muted-foreground hover:text-foreground"
                        >
                            Login
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
}

function SearchDialog() {
    const [results, setResults] = useState([]);

    const handleSearch = (e: SyntheticEvent) => {
        setTimeout(async () => {
            const target = e.target as HTMLInputElement;

            if (target.value !== "") {
                await axios
                    .get(`/search?query=${target.value}`)
                    .then((res) => setResults(res.data.result))
                    .catch((err) => console.log(err));
            }
        }, 300);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                    <Search className="text-muted-foreground" size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full gap-0 p-0 overflow-hidden">
                <DialogHeader className="px-4 border-b">
                    <form className="flex items-center">
                        <Search className="text-muted-foreground" size={20} />
                        <Input
                            placeholder="Search item here"
                            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={handleSearch}
                        />
                    </form>
                </DialogHeader>
                <DialogTitle className="hidden">Searching...</DialogTitle>
                <div className="grid max-h-[calc(100vh_-_theme(spacing.11))] overflow-auto">
                    {results.length > 0 ? (
                        results.map((result: Product) => (
                            <Link
                                href={`/detail/${result.id}`}
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                {result.name}
                            </Link>
                        ))
                    ) : (
                        <>
                            <Link
                                href="?category=men"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Men's Suit
                            </Link>
                            <Link
                                href="?category=men&product=tshirt"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Men's Tshirt
                            </Link>
                            <Link
                                href="?category=men&product=pants"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Men's Pants
                            </Link>
                            <Link
                                href="?category=men&product=jacket"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Men's Jacket
                            </Link>
                            <Link
                                href="?category=men&product=tuxedo"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Men's Tuxedo
                            </Link>
                            <Link
                                href="?category=women"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Women's Suit
                            </Link>
                            <Link
                                href="?category=women&product=tshirt"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Women's Tshirt
                            </Link>
                            <Link
                                href="?category=women&product=pants"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Women's Pants
                            </Link>
                            <Link
                                href="?category=women&product=jacket"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Women's Jacket
                            </Link>
                            <Link
                                href="?category=women&product=tuxedo"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Women's Tuxedo
                            </Link>
                            <Link
                                href="?category=kids"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Kids Suit
                            </Link>
                            <Link
                                href="?category=kids&product=tshirt"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Kids's Tshirt
                            </Link>
                            <Link
                                href="?category=kids&product=pants"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Kids's Pants
                            </Link>
                            <Link
                                href="?category=kids&product=jacket"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Kids's Jacket
                            </Link>
                            <Link
                                href="?category=kids&product=tuxedo"
                                className="px-4 py-3 transition-all hover:bg-neutral-100"
                            >
                                Kids's Tuxedo
                            </Link>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function NavbarSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-lg"
                    >
                        <span>MyBrand</span>
                    </Link>
                    <NavLink name="New Arival" activeParams="" link="" />
                    <NavLink
                        name="Men"
                        activeParams="men"
                        link="?category=men"
                    />
                    <NavLink
                        name="Women"
                        activeParams="women"
                        link="?category=women"
                    />
                    <NavLink
                        name="Kids"
                        activeParams="kids"
                        link="?category=kids"
                    />
                </nav>
            </SheetContent>
        </Sheet>
    );
}

function NavLink({
    link,
    name,
    activeParams,
}: {
    link: string | "";
    name: string;
    activeParams: string;
}) {
    const params = route().params.category;

    return (
        <Link
            href={`/${link}`}
            className={`transition-colors ${
                params === activeParams ||
                (params === undefined && activeParams === "")
                    ? "text-foreground hover:text-foreground"
                    : "text-muted-foreground hover:text-foreground"
            }`}
        >
            {name}
        </Link>
    );
}
