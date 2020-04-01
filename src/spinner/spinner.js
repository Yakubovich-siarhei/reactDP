import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class Spinner extends Component {
  render() {
    return (
      <div>
        {/* <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div> */}
        <CircularProgress />
      </div>
    );
  }
}

export default Spinner;
