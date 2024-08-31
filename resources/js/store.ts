import { configureStore } from "@reduxjs/toolkit";
import productSlicer from "./slicer/productSlicer";

export default configureStore({
    reducer: {
        product: productSlicer,
    },
});
