import React, { Component } from "react";

import { Link } from "react-router-dom";

class Header extends Component {
  // state = {
  //   num: null
  // };

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

    // const profileUser = (
    //   <li className="list-group-item bg-transparent border-0">
    //     <Link to="/profile/user" className="text-light badge badge-dark">
    //       user
    //     </Link>
    //   </li>
    // );

    // const profileUserSettings = (
    //   <li className="list-group-item bg-transparent border-0">
    //     <Link to="/settings" className="text-light badge badge-dark">
    //       Settings
    //     </Link>
    //   </li>
    // );

    // const userNewArticles = (
    //   <li className="list-group-item bg-transparent border-0">
    //     <Link to="/newarticles" className="text-light badge badge-dark">
    //       New Articles
    //     </Link>
    //   </li>
    // );

    const navPanelRegistr = (
      <ul className="list-group list-group-horizontal">
        {home}
        {signUp}
        {signIn}
      </ul>
    );

    // const navPanelUser = (
    //   <ul className="list-group list-group-horizontal">
    //     {home}
    //     {profileUser}
    //     {profileUserSettings}
    //     {userNewArticles}
    //   </ul>
    // );

    // const content = this.state.num ? navPanelUser : navPanelRegistr;

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <div className="col-3">
              <Link to="/" className="navbar-brand">
                CONDUIT
              </Link>
            </div>
            <div className="col-9">{navPanelRegistr}</div>
          </div>
        </nav>
        <nav className="navbar bg-secondary" style={{ height: "100px" }}></nav>
      </div>
    );
  }
}

export default Header;
