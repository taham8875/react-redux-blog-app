import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
  nanoid,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", // ['idle', 'loading', 'succeeded', 'failed']
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost) => {
    try {
      const response = await axios.post(POSTS_URL, newPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    const { id } = updatedPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, updatedPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (deletedPost) => {
    const { id } = deletedPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return deletedPost;
      return `${response?.status}, ${response?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            like: 0,
            love: 0,
            sad: 0,
          };
          return post;
        });
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.meta.arg.id = nanoid();
        action.meta.arg.date = new Date().toISOString();
        action.meta.arg.reactions = {
          like: 0,
          love: 0,
          sad: 0,
        };
        postsAdapter.addOne(state, action.meta.arg);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        postsAdapter.upsertOne(state, action.meta.arg);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        let id = action.meta.arg.id;
        id = Number(id);
        postsAdapter.removeOne(state, id);
      });
  },
});

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId == userId)
);

export default postSlice.reducer;

export const { reactionAdded } = postSlice.actions;
