import { configureStore } from "@reduxjs/toolkit";
import CommentsReducer from "../comments/comments.slice";
import ReplyingReducer from "../replying";

export const store = configureStore({
  reducer: {
    comments: CommentsReducer,
    replying: ReplyingReducer,
  },
});
