import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

class FormSignIN extends Component {
  state = {
    password: null,
    name: null,
    selectedNavBar: false
  };

  onSignPassword = e => {
    const value = e.target.value;
    this.setState({
      password: value
    });
    console.log(this.state.password);
  };

  onSingName = e => {
    const value = e.target.value;
    this.setState({
      name: value
    });
    // console.log("name = " + this.state.name);
  };

  onSign = async () => {
    await axios
      .post(`https://conduit.productionready.io/api/users/login`, {
        user: {
          email: this.state.name,
          password: this.state.password
        }
      })
      .then(res => {
        const articles = res.data;
        console.log("👉 Returned data:", articles);
      })
      .then(() => {
        if (this.state.password) {
          this.props.selectedNavBar();
        } else {
          console.log("error email or password!!!!!");
        }
      })
      .then(() => this.props.history.push("/"))
      .catch(error => {
        // тут обработка ошибки или вывод в консоль
        console.log(error);
      });
    // .catch(function(data) {
    //   console.log(data);
    // });
  };

  render() {
    return (
      <div>
        <form
          className=""
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <label>User name</label>
            <input
              type="email"
              className="form-control"
              onChange={this.onSingName}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onSignPassword}
            />
          </div>
          <button
            type="submit"
            className="btn btn btn-outline-success"
            onClick={this.onSign}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormSignIN);
