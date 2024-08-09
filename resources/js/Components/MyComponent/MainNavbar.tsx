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
import { User } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";

export default function MainNavbar({ user }: { user: User }) {
    return (
        <header className="sticky top-0 flex items-center justify-between w-full h-16 gap-4 px-4 border-b bg-background md:px-6">
            <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <NavLink name="Home" link="" />
                <NavLink name="All product" link="products" />
                <NavLink name="Men" link="men" />
                <NavLink name="Women" link="women" />
                <NavLink name="Kids" link="kids" />
            </nav>
            <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-lg"
            >
                <span>MyBrand</span>
            </Link>
            <div className="flex items-center justify-end lg:w-[307px]">
                <SearchDialog />
                <Button asChild size={"icon"} variant={"ghost"}>
                    <Link href="/cart">
                        <ShoppingCart
                            className="text-muted-foreground"
                            size={20}
                        />
                    </Link>
                </Button>
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
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link href={route("logout")} method="post">
                                    Logout
                                </Link>
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
                <NavbarSheet />
            </div>
        </header>
    );
}

function SearchDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                    <Search className="text-muted-foreground" size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-4 border-b">
                    <form action="" className="flex items-center">
                        <Search className="text-muted-foreground" size={20} />
                        <Input
                            placeholder="Search item here"
                            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </form>
                </DialogHeader>
                <div className="grid sm:max-h-[240px] overflow-auto">
                    <Link
                        href="#"
                        className="px-4 py-3 transition-all hover:bg-neutral-100"
                    >
                        Men Suit
                    </Link>
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
                    variant="outline"
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
                    <NavLink name="Home" link="" />
                    <NavLink name="All product" link="products" />
                    <NavLink name="Men" link="men" />
                    <NavLink name="Women" link="women" />
                    <NavLink name="Kids" link="kids" />
                </nav>
            </SheetContent>
        </Sheet>
    );
}

function NavLink({ link, name }: { link: string | ""; name: string }) {
    return (
        <Link
            href={`/${link}`}
            className={`transition-colors ${
                route().current()?.includes(link)
                    ? "text-foreground hover:text-foreground"
                    : "text-muted-foreground hover:text-foreground"
            }`}
        >
            {name}
        </Link>
    );
}
