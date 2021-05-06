import { useRef } from "react";
import { getRepos } from "./gitActions";
import { useDispatch } from "react-redux";

function GitThunk() {
  const userNameRef = useRef();
  const dispatch = useDispatch();

  const click = (e) => {
    e.preventDefault();
    dispatch(getRepos(userNameRef.current.value));
  };

  return (
    <>
      <h4>Redux Thunk</h4>
      <div className="section">
        <form style={{ width: "100%" }}>
          <fieldset
            style={{
              width: "60%",
              margin: "auto",
              marginBottom: "2%",
              textAlign: "end",
            }}
          >
            <legend>Search</legend>
            <input
              ref={userNameRef}
              className="fields"
              type="text"
              id="username"
              placeholder="Git UserName"
              name="username"
            />

            <button
              className="buttons"
              style={{ width: "20%" }}
              onClick={click}
            >
              Search
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default GitThunk;
