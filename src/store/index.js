import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";
import { pegawaiSlice } from "./features/pegawai/pegawaiSlice";
import { jobSlice } from "./features/job/jobSlice";
import { barangSlice } from "./features/barang/barangSlice";

const reducer = combineReducers({
    [userSlice.reducerPath]: userSlice.reducer,
    [pegawaiSlice.reducerPath]: pegawaiSlice.reducer,
    [jobSlice.reducerPath]: jobSlice.reducer,
    [barangSlice.reducerPath]: barangSlice.reducer,
});

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            [userSlice.middleware],
            [pegawaiSlice.middleware],
            [jobSlice.middleware],
            [barangSlice.middleware]
        ),
});

export default store;
