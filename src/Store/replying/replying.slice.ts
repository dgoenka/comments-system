import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { commentsSlice } from "../comments";

export type ReplyingState = {
  replyingToId: string | number | null;
};

const initialState: ReplyingState = {
  replyingToId: null,
};

export const replyingSlice = createSlice({
  name: "replying",
  initialState,
  reducers: {
    setReplyingTo: (state, action: PayloadAction<string | number | null>) => {
      state.replyingToId = action.payload;
    },
  },
});

export const { setReplyingTo } = replyingSlice.actions;

export const getReplyingTo = (state: RootState) => state.replying.replyingToId;

export default replyingSlice.reducer;
