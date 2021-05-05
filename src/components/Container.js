import DragDrop from "../dragDrop/DragDrop";
import SideBar from "./SideBar";
import Forms from "../forms/Forms";
import Api from "../api/Api";
import Hoc from "../hoc/Container";
import PostWithStore from "../redux";
import { useState } from "react";
import Navigation from "../navigation/Navigation";
import Main from "../errorBoundary/Main";

const completedArray = [{ name: "one", bgcolor: "skyblue" }],
  pendingArray = [
    { name: "Two", bgcolor: "yellow" },
    { name: "Three", bgcolor: "pink" },
  ],
  completedAlphaArray = [{ name: "A", bgcolor: "skyblue" }],
  pendingAlphaArray = [
    { name: "B", bgcolor: "yellow" },
    { name: "C", bgcolor: "pink" },
    { name: "D", bgcolor: "red" },
  ];

function Container() {
  const [showDiv, setShowDiv] = useState("dragdrop");

  const hideShow = (id) => {
    setShowDiv(id);
  };

  return (
    <div className="app">
      <SideBar hideShow={hideShow} />
      <div className="container">
        {showDiv === "dragdrop" ? (
          <div id="dragdrop">
            <DragDrop
              completedArray={completedArray}
              pendingArray={pendingArray}
              horizontal={false}
            />
            <hr></hr>
            <DragDrop
              completedArray={completedAlphaArray}
              pendingArray={pendingAlphaArray}
              horizontal={true}
            />
          </div>
        ) : null}

        {showDiv === "forms" ? (
          <div id="forms">
            <Forms />
          </div>
        ) : null}

        {showDiv === "api" ? (
          <div id="api">
            <Api />
          </div>
        ) : null}

        {showDiv === "redux" ? (
          <div id="redux">
            <PostWithStore />
          </div>
        ) : null}

        {showDiv === "hoc" ? (
          <div id="hoc">
            <Hoc />
          </div>
        ) : null}

        {showDiv === "navigation" ? (
          <div id="navigation">
            <Navigation />
          </div>
        ) : null}

        {showDiv === "error" ? (
          <div id="error">
            <Main />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Container;
