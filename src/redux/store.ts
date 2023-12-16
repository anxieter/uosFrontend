import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import boardReducer from "./board";
import charactersReducer from "./characters";


const store = configureStore({
    reducer: {
        auth: authReducer,
        board: boardReducer,
        characters:charactersReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
