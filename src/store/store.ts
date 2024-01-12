import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";

export const store = configureStore({
  reducer: {
    user: userSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
