import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

class FormSignIN extends Component {
  state = {
    password: null,
    name: null,
    selectedNavBar: false,
    errorMesage: {},
    errorMesageActive: false,
    user: null,
    token: null
  };

  handleFormSubmit = () => {
    const { user, token } = this.state;
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
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

  errorMesageRender() {
    const { errorMesage, errorMesageActive } = this.state;
    if (errorMesageActive) {
      console.log(this.state);
      const erMes = errorMesage;

      const erMes2 = Object.getOwnPropertyNames(erMes);
      return <p>{erMes2 + ": " + erMes["email or password"]}</p>;
    }
  }

  onSign = async () => {
    await axios
      .post(`https://conduit.productionready.io/api/users/login`, {
        user: {
          email: this.state.name,
          password: this.state.password
        }
      })
      .then(res => {
        const articles = res.data.user;
        this.setState({
          token: articles.token,
          user: articles.username
        });
        this.handleFormSubmit();
        console.log("👉 Returned data:", articles);
      })
      .then(() => {
        if (this.state.password) {
          this.props.selectedNavBar();
        }
      })
      .then(() => this.props.history.push("/"))
      .catch(error => {
        const errorMes = error.response.data.errors;
        this.setState({
          errorMesage: errorMes,
          errorMesageActive: true
        });
        // console.log(error.response.data.errors);
        this.errorMesageRender();
      });
  };

  render() {
    const { errorMesageActive } = this.state;
    const errorMesager = this.errorMesageRender();
    const contentEroor = errorMesageActive ? errorMesager : null;
    return (
      <div>
        <div>{contentEroor}</div>
        <form
          className=""
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <label>User email</label>
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
