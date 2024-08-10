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
    variant: string;
    color: string;
    price: number;
    image: string;
}

export interface Cart {
    id: string;
    user_id: string;
    cloth_id: string;
    amount: number;
    total_price: number;
}

export interface Order {
    id: string;
    user_id: string;
    cloth_id: string;
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
