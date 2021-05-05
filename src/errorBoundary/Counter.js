import React from "react";
class Counter extends React.Component {
  state = {
    count: 0,
  };

  click = (e) => {
    if (e.target.id === "increment") {
      this.setState({ count: this.state.count + 1 });
    } else {
      this.setState({ count: this.state.count - 1 });
    }
  };

  render() {
    if (this.props.error && this.state.count === 5) {
      throw new Error("error");
    }

    return (
      <div style={{ width: "50%" }}>
        <fieldset>
          <legend>{this.props.name}</legend>
          <div className="number">{this.state.count}</div>

          <button
            className="buttons"
            id="decrement"
            style={{ width: "50%" }}
            onClick={this.click}
          >
            Decrement
          </button>

          <button
            className="buttons"
            id="increment"
            style={{ width: "50%" }}
            onClick={this.click}
          >
            Increment
          </button>
        </fieldset>
      </div>
    );
  }
}

export default Counter;
