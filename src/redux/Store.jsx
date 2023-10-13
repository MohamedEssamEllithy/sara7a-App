import { configureStore } from "@reduxjs/toolkit";
import { messageReducer } from "./messageSlice";


  let Store = configureStore({
    reducer: {
      messageRed: messageReducer
    },
  });
export default Store