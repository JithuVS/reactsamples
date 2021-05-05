import React from "react";
import Counter from "./Counter";
import ErrorBoundary from "./ErrorBoundary";

const Main = () => {
  return (
    <>
      <ErrorBoundary>
        <h4>Error Boundary</h4>
        <div className="section">
          <Counter name="Buggy counter" error></Counter>
          <br></br>
          <Counter name="Counter" error={false}></Counter>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Main;
