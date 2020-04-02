import React, { Component } from "react";

import AllList from "./All-list";
import Header from "./headers/headers";
import HeaderUser from "./headers/headerUser";
import FormLogIn from "./form-log/form-log";
import FormSign from "./form-sign/form-sign";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./footer/footer";

export default class App extends Component {
  state = {
    selectedNavBar: false,
    token: null,
    user: null
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    this.setState({
      user: user,
      token: token
    });
  }

  selectedNavBar = async () => {
    if (this.state.selectedNavBar === false) {
      this.setState({
        selectedNavBar: true
      });
    }
  };

  render() {
    const { user, selectedNavBar } = this.state;

    const contentHeader = user || selectedNavBar ? <HeaderUser /> : <Header />;

    const formSign = <FormSign selectedNavBar={this.selectedNavBar} />;

    return (
      <div className="wripper">
        <Router>
          <div className="stardb-app">
            {contentHeader}
            <Route path="/" component={AllList} exact />
            <Route path="/login/" component={FormLogIn} exact />
            <Route path="/register/" render={() => formSign} exact />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
