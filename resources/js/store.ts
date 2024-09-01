import { configureStore } from "@reduxjs/toolkit";
import cartSlicer from "./slicer/cartSlicer";

const store = configureStore({
    reducer: {
        cart: cartSlicer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
