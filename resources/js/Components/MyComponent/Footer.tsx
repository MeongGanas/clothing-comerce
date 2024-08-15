import { Link } from "@inertiajs/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
    return (
        <>
            <div className="container grid gap-10 py-10 md:grid-cols-2">
                <div className="max-w-lg">
                    <h1 className="text-2xl font-bold md:text-5xl">MyBrand</h1>
                    <p className="mt-5 mb-3 text-muted-foreground">
                        Get newsletter update for upcoming product and best
                        discount for all item
                    </p>
                    <form action="" className="flex gap-2">
                        <Input
                            className="p-6 rounded-full"
                            type="email"
                            placeholder="Your Email"
                        />
                        <Button
                            className="px-6 py-6 rounded-full lg:px-12"
                            size="lg"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
                <div className="flex lg:justify-end">
                    <div className="grid max-w-lg grid-cols-3 gap-4">
                        <div id="product">
                            <h1 className="mb-3 text-lg font-bold">Product</h1>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Tshirt
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Jacket
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Shoes
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Pants
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Sunglasses
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Tuxedo
                            </Link>
                        </div>
                        <div id="categories">
                            <h1 className="mb-3 text-lg font-bold">
                                Categories
                            </h1>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Man
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Woman
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Kids
                            </Link>
                        </div>
                        <div id="social">
                            <h1 className="mb-3 text-lg font-bold">
                                Our Social Media
                            </h1>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Instagram
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Facebook
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Youtube
                            </Link>
                            <Link
                                href="/"
                                className="block transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Twitter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container block py-5 text-white bg-black md:justify-between md:flex">
                <h1 className="mb-3 md:mb-0">@2023 MyBrand Production</h1>
                <div className="flex gap-5">
                    <Link
                        className="text-xs transition-colors sm:text-base hover:text-muted"
                        href="/terms&conditions"
                    >
                        Terms & Conditions
                    </Link>
                    <Link
                        className="text-xs transition-colors sm:text-base hover:text-muted"
                        href="/privacy"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        className="text-xs transition-colors sm:text-base hover:text-muted"
                        href="/cookie"
                    >
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </>
    );
}
