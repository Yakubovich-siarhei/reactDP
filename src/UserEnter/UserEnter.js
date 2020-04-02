import React, { Component } from "react";

class UserEnter extends Component {
  state = {
    token: null,
    user: null
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    this.setState({ user, token });
  }

  render() {
    return <div></div>;
  }
}

export default UserEnter;
