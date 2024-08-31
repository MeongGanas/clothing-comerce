import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
    value: Product[];
}

const initialState: ProductState = {
    value: [],
};

export const cartSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            state.value.push(action.payload);
        },
        remove: (state, action: PayloadAction<{ id: string }>) => {
            state.value.filter((product) => product.id !== action.payload.id);
        },
    },
});

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;
