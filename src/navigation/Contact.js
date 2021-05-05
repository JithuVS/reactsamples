import Tech from "./Tech";
import { Link, Route, useRouteMatch } from "react-router-dom";
const Contact = () => {
  const { url, path } = useRouteMatch();
  return (
    <div>
      <fieldset>
        <legend>Contact</legend>
        <p style={{ textAlign: "justify" }}>
          Contact: It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that it has a more-or-less
          normal distribution of letters, as opposed to using 'Content here,
          content here', making it look like readable English. Many desktop
          publishing packages and web page editors now use Lorem Ipsum as their
          default model text, and a search for 'lorem ipsum' will uncover many
          web sites still in their infancy. Various versions have evolved over
          the years, sometimes by accident, sometimes on purpose (injected
          humour and the like).
        </p>
        <nav
          style={{
            width: "50%",
            backgroundColor: "lightblue",
            marginBottom: "2%",
          }}
        >
          <Link className="nav" to={`${url}/javascript`}>
            Javascript
          </Link>
          <Link className="nav" to={`${url}/html`}>
            Html
          </Link>
          <Link className="nav" to={`${url}/css`}>
            Css
          </Link>
        </nav>

        <Route path={`${url}/:tech`}>
          <Tech />
        </Route>
      </fieldset>
    </div>
  );
};

export default Contact;