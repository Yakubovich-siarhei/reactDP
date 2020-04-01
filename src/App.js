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
    selectedNavBar: false
  };

  selectedNavBar = async () => {
    if (this.state.selectedNavBar === false) {
      this.setState({
        selectedNavBar: true
      });
    }
  };

  // onclick = () => {
  //   if (this.state.selectedNavBar === true) {
  //     this.setState({
  //       selectedNavBar: false
  //     });
  //   } else {
  //     this.setState({
  //       selectedNavBar: true
  //     });
  //   }
  // };

  render() {
    const head = !this.state.selectedNavBar ? <Header /> : <HeaderUser />;
    const formSign = <FormSign selectedNavBar={this.selectedNavBar} />;

    return (
      <div className="wripper">
        {/* <button onClick={this.onclick}>hed</button> */}
        <Router>
          <div className="stardb-app">
            {head}
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
