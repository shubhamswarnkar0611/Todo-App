import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "./services/appApi";

const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export default store;