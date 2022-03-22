import React, { useState } from "react";
import MyChart from "./MyChart";
import BarChart from "./Bar";

const horizontal = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const vertical = {};

const d1 = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Dataset 1",
      data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
        () => Math.random() * (100 - 0) + 0
      ),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
        () => Math.random() * (200 - 0) + 0
      ),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const d2 = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Dataset 1",
      data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
        () => Math.random() * (100 - 0) + 0
      ),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
        () => Math.random() * (200 - 0) + 0
      ),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const d3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ].map(() => Math.random() * (1000 - 0) + 0),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ].map(() => Math.random() * (1000 - 0) + 0),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const Btns = (props) => {
  return (
    <button onDragStart={(e) => props.onDragStart(e, `${props.id}`)} draggable>
      {props.name}
    </button>
  );
};

const Charts = (props) => {
  const [completed, setCompletedTask] = useState(props.completedArray);
  const [progress, setProgressTask] = useState(props.pendingArray);
  const [newdata, setNewData] = useState(d1);
  const [buttons, setButtons] = useState([]);

  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks;
    if (["d1", "d2", "d3"].includes(id)) {
      setButtons([{'id': id, 'name': id, btn: Btns }]);
      setNewData(id == "d1" ? d1 : id == "d2" ? d2 : d3);
    } else {
      tasks = progress.filter((task) => {
        if (task.id == id) {
          return task;
        }
      });
      setCompletedTask([...completed, ...tasks]);
    }
  };

  return (
    <>
      <h4>Charts</h4>
      <div>
        <div style={{ borderStyle: "double", borderColor: "red" }}>
          <Btns id='d1' name='Dataset 1' onDragStart={onDragStart}></Btns>
          <Btns id='d2' name='Dataset 2' onDragStart={onDragStart}></Btns>
          <Btns id='d3' name='Dataset 3' onDragStart={onDragStart}></Btns>
        </div>
      </div>
      <hr></hr>
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
              onDragStart={(e) => onDragStart(e, t.id)}
              draggable
              className="draggable"
            >
              <t.chart data={newdata}/>
            </div>
          ))}
        </div>
        <div
          className="complete"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "complete")}
        >
          {completed.map((t, i) => {
            return (
              <div
                key={i}
                onDragStart={(e) => onDragStart(e, t.id)}
                draggable
                className="draggable"
                style={{ backgroundColor: t.bgcolor }}
              >
                <t.chart data={newdata}/>
              </div>
            );
          })}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="section">
        <div
          className="complete"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "complete")}
        >
          {buttons.map((t, i) => (
            <div
              key={i}
              onDragStart={(e) => onDragStart(e, t.id)}
              draggable
              className="draggable"
            >
              <t.btn id={t.id} name={t.name}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Charts;
