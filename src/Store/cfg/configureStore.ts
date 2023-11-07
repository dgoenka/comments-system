import { configureStore } from "@reduxjs/toolkit";
import CommentsReducer from "../comments/comments.slice";

export const store = configureStore({
  reducer: {
    comments: CommentsReducer,
  },
});
