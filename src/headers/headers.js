import React, { Component } from "react";

import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const home = (
      <li className="list-group-item bg-transparent border-0">
        <Link to="/" className="text-light badge badge-dark">
          Home
        </Link>
      </li>
    );

    const signIn = (
      <li className="list-group-item bg-transparent border-0">
        <Link to="/register" className="text-light badge badge-dark">
          Sign in
        </Link>
      </li>
    );

    const signUp = (
      <li className="list-group-item bg-transparent border-0">
        <Link to="/login" className="text-light badge badge-dark">
          Sign up
        </Link>
      </li>
    );

    const navPanelRegistr = (
      <ul className="list-group list-group-horizontal">
        {home}
        {signUp}
        {signIn}
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <div className="col-3">
              <Link to="/" className="navbar-brand">
                CONDUIT
              </Link>
            </div>
            <div className="col-9 d-flex justify-content-end">
              {navPanelRegistr}
            </div>
          </div>
        </nav>
        <nav className="navbar bg-secondary" style={{ height: "100px" }}></nav>
      </div>
    );
  }
}

export default Header;
