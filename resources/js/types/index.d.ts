export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    role: string;
    email_verified_at: string;
}

export interface Cloth {
    id: string;
    name: string;
    description: string;
    size: string;
    category: string;
    product: string;
    isFeatured: boolean;
    isArchived: boolean;
    color: string;
    price: number;
    image: string;
}

export interface Order {
    id: string;
    user_id: string;
    cloth_id: string;
    size: string;
    amount: number;
    total_price: number;
}

export interface Cart {
    product: Cloth;
    amount: number;
    total_price: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
