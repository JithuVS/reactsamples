import axios from "axios";
import React, { useEffect } from "react";

const WrapperComponent = (Component, url) => {
  return class extends React.Component {
    state = {
      data: null,
    };

    componentDidMount() {
      axios(url).then((response) => {
        let data = response.data.slice(0, 2);
        this.setState({ data: data });
      });
    }

    render() {
      return (
        <Component {...this.props}>
          {this.state?.data
            ? this.state?.data.map((i, j) => {
                return <div key={j}>{JSON.stringify(i)}</div>;
              })
            : "Loading..."}
        </Component>
      );
    }
  };
};

export default WrapperComponent;
