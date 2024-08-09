import MainNavbar from "@/Components/MyComponent/MainNavbar";
import { User } from "@/types";
import { PropsWithChildren } from "react";

export default function MainLayout({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    return (
        <div>
            <MainNavbar user={user} />
            <main className="container">{children}</main>
        </div>
    );
}
