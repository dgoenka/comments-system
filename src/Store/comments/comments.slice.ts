import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../types";
import COMMENTS_DUMMY_DATA from "./dummy";

export type Author = {
  profilePicUrl?: string;
  displayName?: string;
};

export type Comment = {
  id: string | number;
  author: Author;
  contents: string;
  date: string;
  comments?: Comment[];
};

export type Post = {
  id: string | number;
  author: Author;
  date: string;
  contents: string;
  title?: string;
  comments?: Comment[];
};

export type PostsState = {
  posts: Post[];
  total: number;
};

const initialState: PostsState = {
  posts: [...COMMENTS_DUMMY_DATA.posts.slice(0, 30)],
  total: 0,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<PostsState>) => {
      state.posts.push(...action.payload.posts);
      state.total = action.payload.total;
    },
  },
});

export const getPosts = (state: RootState) => state.comments.posts;
export const getPost: (
  postId: string,
) => (state: RootState) => Post | undefined =
  (postId: string) => (state: RootState) => {
    const post: Post | undefined = state.comments.posts.find(
      (post) => post.id === postId,
    );
    return post;
  };

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
