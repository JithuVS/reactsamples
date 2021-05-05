import { useParams, Link, Route, useRouteMatch } from "react-router-dom";

const Tech = () => {
  const { tech } = useParams();
  const { url, path } = useRouteMatch();
  return (
    <div>
      <fieldset>
        <legend>{tech}</legend>
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

export default Tech;
