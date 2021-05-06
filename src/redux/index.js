import React from "react";
import Post from "./Post";
import PostList from "./PostList";
import GitThunk from "./GitThunk";
import GitDetails from "./GitDetails";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import postReducer from "./postReducer";
import gitReducer from "./gitReducer";
import thunk from "redux-thunk";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

const postStore = createStore(postReducer);
const gitStore = createStore(gitReducer, [], applyMiddleware(thunk));

function PostWithStore() {
  return (
    <>
      <BrowserRouter>
        <nav
          style={{
            width: "100%",
            backgroundColor: "cadetblue",
            marginBottom: "2%",
          }}
        >
          <Link className="nav" to="/">
            Redux
          </Link>
          <Link className="nav" to="/thunk">
            Thunk
          </Link>
        </nav>

        <br></br>
        <br></br>

        <Switch>
          <Route exact path="/">
            <Provider store={postStore}>
              <Post />
              <PostList />
            </Provider>
          </Route>
          <Route exact path="/thunk">
            <Provider store={gitStore}>
              <GitThunk />
              <GitDetails />
            </Provider>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default PostWithStore;
