import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";

class HeaderUser extends Component {
  username = localStorage.getItem("username");

  onSelectAutor = () => {
    this.props.history.push(`/profile/${this.username}`);
  };

  render() {
    const home = (
      <li className="list-group-item bg-transparent border-0">
        <Link to="/" className="text-light badge badge-dark">
          Home
        </Link>
      </li>
    );

    const profileUser = (
      <li className="list-group-item bg-transparent border-0">
        <span
          className="text-light badge badge-dark"
          onClick={() => {
            this.onSelectAutor();
          }}
        >
          {this.username}
        </span>
      </li>
    );

    const profileUserSettings = (
      <li className="list-group-item bg-transparent border-0">
        <Link to="/settings/" className="text-light badge badge-dark">
          Settings
        </Link>
      </li>
    );

    const userNewArticles = (
      <li className="list-group-item bg-transparent border-0">
        <Link to="/newarticles/" className="text-light badge badge-dark">
          New Articles
        </Link>
      </li>
    );

    const navPanelUser = (
      <ul className="list-group list-group-horizontal">
        {home}
        {userNewArticles}
        {profileUserSettings}
        {profileUser}
      </ul>
    );

    // const content = this.state.num ? navPanelUser : navPanelRegistr;

    return (
      <div>
        <div className="navbar navbar-dark bg-dark ">
          <div className="container">
            <div className="col-3">
              <Link to="/" className="navbar-brand">
                CONDUIT
              </Link>
            </div>
            <div className="col-9 d-flex justify-content-end">
              {navPanelUser}
            </div>
          </div>
        </div>
        {/* <nav className="navbar bg-secondary" style={{ height: "100px" }}></nav> */}
      </div>
    );
  }
}

export default withRouter(HeaderUser);
