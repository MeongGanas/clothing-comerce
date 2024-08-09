export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    email_verified_at: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    size: string;
    variant: string;
    color: string;
    price: number;
    image: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
