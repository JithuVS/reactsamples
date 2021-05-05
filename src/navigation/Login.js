import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", true);
    history.push("/");
  };

  const click = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div>
      {localStorage.getItem("token") !== "true" ? (
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <fieldset
            style={{
              width: "60%",
              margin: "auto",
              marginBottom: "2%",
              textAlign: "end",
            }}
          >
            <legend>Login</legend>
            <input
              id="username"
              placeholder="UserName"
              className="fields"
              type="text"
            ></input>

            <input
              id="password"
              placeholder="Password"
              className="fields"
              type="password"
            ></input>

            <input type="submit" className="buttons" style={{ width: "20%" }} />
          </fieldset>
        </form>
      ) : (
        <button style={{ width: "50%" }} className="buttons" onClick={click}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
