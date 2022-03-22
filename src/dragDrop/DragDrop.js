import { useState } from "react";

const horizontal = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const vertical = {};

const DragDrop=(props) => {
  const [completed, setCompletedTask] = useState(props.completedArray);
  const [progress, setProgressTask] = useState(props.pendingArray);

  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = progress.filter((task) => {
      if (task.name === id) {
        return task;
      }
    });
    setCompletedTask([...completed, ...tasks]);
  };

  return (
    <>
      <h4>Drag Drop</h4>
      <div className="section">
        <div
          className="progress"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => {
            onDrop(e, "progress");
          }}
        >
          {progress.map((t, i) => (
            <div
              key={i}
              onDragStart={(e) => onDragStart(e, t.name)}
              draggable
              className="draggable"
              style={{ backgroundColor: t.bgcolor }}
            >
              {t.name}
            </div>
          ))}
        </div>
        <div
          className="complete"
          style={props.horizontal ? horizontal : vertical}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "complete")}
        >
          {completed.map((t, i) => {
            return (
              <div
                key={i}
                onDragStart={(e) => onDragStart(e, t.name)}
                draggable
                className="draggable"
                style={{ backgroundColor: t.bgcolor }}
              >
                {t.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DragDrop;
