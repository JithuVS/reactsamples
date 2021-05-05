import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import Modal from "../components/Modal";

function PostList() {
  const list = useSelector((state) => state),
    dispatch = useDispatch(),
    titleRef = useRef(),
    messageRef = useRef(),
    [showModal, setShowModal] = useState(false),
    [id, setId] = useState(null);

  const click = (e) => {
    e.preventDefault();
    if (e.target.name === "delete") {
      dispatch({
        type: "DELETE_POST",
        id: e.target.id,
      });
    }
    if (e.target.name === "edit") {
      const data = list.filter((i) => {
        return i.id === e.target.id;
      });
      titleRef.current.value = data[0].title;
      messageRef.current.value = data[0].message;
      setId(e.target.id);
      modalOpen();
    }
  };

  const handleSubmit = (e) => {
    let title = titleRef.current.value,
      message = messageRef.current.value;
    if (title && message) {
      let data = {};
      data.id = id;
      data.title = title;
      data.message = message;
      dispatch({
        type: "UPDATE",
        data: data,
      });
      modalClose();
    }
  };

  const modalOpen = () => {
    setShowModal(true);
  };

  const modalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} handleClose={(e) => modalClose(e)}>
        <div>
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
        </div>
        <div style={{ display: "flex" }}>
          <button className="buttons" onClick={modalClose}>
            close
          </button>
          <button
            className="buttons"
            onClick={(e) => handleSubmit(e)}
            type="button"
          >
            Post
          </button>
        </div>
      </Modal>
      <div className="section">
        <fieldset style={{ width: "100%" }}>
          <legend>Post List</legend>
          <table className="table" onClick={click}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {list.map((post, id) => {
                return (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.message}</td>
                    <td>
                      <button id={post.id} name="edit" className="buttons">
                        edit
                      </button>
                    </td>
                    <td>
                      <button id={post.id} name="delete" className="buttons">
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </fieldset>
      </div>
    </>
  );
}

export default PostList;
