import Footer from "@/Components/MyComponent/Footer";
import MainNavbar from "@/Components/MyComponent/MainNavbar";
import { User } from "@/types";
import { PropsWithChildren } from "react";

export default function MainLayout({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    return (
        <>
            <MainNavbar user={user} />
            <main className="container px-4 sm:px-8">{children}</main>
            <Footer />
        </>
    );
}
