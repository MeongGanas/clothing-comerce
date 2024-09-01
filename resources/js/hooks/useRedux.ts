// hooks/useRedux.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

// Custom hook untuk useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Custom hook untuk useSelector dengan tipe yang sudah di-typed
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
