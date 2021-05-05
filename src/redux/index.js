import React from "react";
import Post from "./Post";
import PostList from "./PostList";
import { createStore } from "redux";
import { Provider } from "react-redux";
import postReducer from "./postReducer";

const store = createStore(postReducer);

function PostWithStore() {
  return (
    <Provider store={store}>
      <Post />
      <PostList />
    </Provider>
  );
}

export default PostWithStore;
