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
            state.value.push(action.payload);
        },
        remove: (state, action: PayloadAction<{ id: string }>) => {
            state.value.filter((cart) => cart.product.id !== action.payload.id);
        },
    },
});

export const { add, remove, setCart } = cartSlice.actions;

export default cartSlice.reducer;
