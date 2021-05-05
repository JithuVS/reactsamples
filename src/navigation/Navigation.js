import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
const Navigation = () => {
  debugger;
  return (
    <>
      <BrowserRouter>
        <h4>Navigation</h4>
        <nav
          style={{
            width: "100%",
            backgroundColor: "cadetblue",
            marginBottom: "2%",
          }}
        >
          <Link className="nav" to="/">
            Home
          </Link>
          <Link className="nav" to="/contact">
            Contact
          </Link>
          <Link className="nav" to="/about">
            About
          </Link>
          <Link className="nav" to="/login">
            Login/Logout
          </Link>
        </nav>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/contact">
            <Contact />
          </PrivateRoute>
          <PrivateRoute path="/about">
            <About />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Navigation;
