import { Cart } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        },
        remove: (state, action: PayloadAction<{ id: string | undefined }>) => {
            const filteredCart = state.value.filter(
                (cart) => !(cart.id === action.payload.id)
            );
            state.value = filteredCart;
        },
    },
});

export const { add, remove, setCart } = cartSlice.actions;

export default cartSlice.reducer;
