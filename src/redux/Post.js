import { useDispatch } from "react-redux";
import { useRef } from "react";

function Post() {
  const dispatch = useDispatch(),
    titleRef = useRef(),
    messageRef = useRef();

  const click = (e) => {
    e.preventDefault();
    const title = titleRef.current.value,
      message = messageRef.current.value,
      data = {
        id: new Date().toString(),
        title,
        message,
      };
    dispatch({ type: "ADD_POST", data: data });
  };

  return (
    <>
      <h4>Redux</h4>
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
            <legend>Add Post</legend>
            <input
              ref={titleRef}
              className="fields"
              type="text"
              id="title"
              placeholder="Title"
              name="title"
            />

            <textarea
              ref={messageRef}
              className="fields"
              id="message"
              placeholder="Message"
              name="message"
            />

            <button
              className="buttons"
              style={{ width: "20%" }}
              onClick={click}
            >
              Post
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default Post;
