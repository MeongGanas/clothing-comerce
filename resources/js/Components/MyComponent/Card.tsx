import { Cloth } from "@/types";
import { Link } from "@inertiajs/react";

export default function ClothCard({ cloth }: { cloth?: Cloth }) {
    return (
        <Link href="/" className="w-full max-w-xs mx-auto space-y-4">
            <div className="overflow-hidden border rounded-2xl">
                <img src="/images/baju.jpg" alt="" />
            </div>
            <div>
                <h1 className="text-xl font-bold sm:text-2xl">
                    Badacore Tshirt
                </h1>
                <p className="mt-1 mb-2 text-xs sm:text-sm text-muted-foreground">
                    Classic t-shirt for daily use
                </p>
                <h1 className="text-xl font-bold sm:text-2xl">$90</h1>
            </div>
        </Link>
    );
}
