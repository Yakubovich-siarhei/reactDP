import React, { Component } from "react";

import AllList from "./All-list";
import Header from "./headers/headers";
import HeaderUser from "./headers/headerUser";
import FormLogIn from "./form-log/form-log";
import FormSign from "./form-sign/form-sign";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./footer/footer";
import UserEnter from "./UserEnter/UserEnter";
import Settings from "./settings/settings";
import NewArtikles from "./newArtikles/newArtikles";

export default class App extends Component {
  state = {
    selectedNavBar: false,
    token: null,
    username: null,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    this.setState({
      username: username,
      token: token,
    });
  }

  selectedNavBar = async () => {
    if (this.state.selectedNavBar === false) {
      this.setState({
        selectedNavBar: true,
      });
    }
  };

  render() {
    const { username, selectedNavBar } = this.state;

    const contentHeader =
      username || selectedNavBar ? <HeaderUser /> : <Header />;

    const formSign = <FormSign selectedNavBar={this.selectedNavBar} />;

    return (
      <div className="wripper">
        <Router>
          <div className="stardb-app">
            {contentHeader}
            <Route path="/" component={AllList} exact />
            <Route path="/login/" component={FormLogIn} exact />
            <Route path="/register/" render={() => formSign} exact />
            <Route path="/profile/user/" component={UserEnter} exact />
            <Route path="/settings/" component={Settings} exact />
            <Route path="/newarticles/" component={NewArtikles} exact />

            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
