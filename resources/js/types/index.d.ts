export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    role: string;
    email_verified_at: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    stocks: number;
    category: string;
    product: string;
    isFeatured: boolean;
    isArchived: boolean;
    color: string;
    price: number;
    image: string;
    created_at: string;
    available_size: string;
    caption: string;
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
    product: Product;
    amount: number;
    total_price: number;
}

export interface ProductsProps {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: 1;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
