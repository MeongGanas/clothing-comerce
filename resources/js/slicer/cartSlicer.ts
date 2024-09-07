import { Cart } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductState {
    value: Cart[];
}

const initialState: ProductState = {
    value: [],
};

export const cartSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart[]>) => {
            state.value = action.payload;
        },
        add: (state, action: PayloadAction<Cart>) => {
            const isInTheCart = state.value.some(
                (cart) =>
                    cart.product_id === action.payload.product_id &&
                    cart.selected_size === action.payload.selected_size
            );
            if (!isInTheCart) {
                state.value.push(action.payload);
            }
            axios.post("/cart", action.payload);
        },
        remove: (state, action: PayloadAction<{ id: string | undefined }>) => {
            const filteredCart = state.value.filter(
                (cart) => !(cart.id === action.payload.id)
            );
            state.value = filteredCart;
            axios.post(`/cart/${action.payload.id}`, {
                _method: "delete",
            });
        },
        updateAmount: (
            state,
            action: PayloadAction<{ id: string | undefined; amount: number }>
        ) => {
            const filteredCart = state.value.filter(
                (cart) => cart.id === action.payload.id
            )[0];
            filteredCart.amount = action.payload.amount;

            axios.post(`/cart/${filteredCart.id}`, {
                _method: "patch",
                ...filteredCart,
            });
        },
    },
});

export const { add, remove, setCart, updateAmount } = cartSlice.actions;

export default cartSlice.reducer;
