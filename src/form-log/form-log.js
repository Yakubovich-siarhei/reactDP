import React, { Component } from "react";
import axios from "axios";

class FormLogIn extends Component {
  state = {
    email: null,
    name: null,
    password: null,
    token: null
  };

  onChangeMail = e => {
    const value = e.target.value;
    this.setState({
      email: value
    });
    console.log("email = " + this.state.email);
  };

  onChangePassword = e => {
    const value = e.target.value;
    this.setState({
      password: value
    });
    console.log("pass = " + this.state.name);
  };

  onChangeName = e => {
    const value = e.target.value;
    this.setState({
      name: value
    });
    console.log("name = " + this.state.name);
  };

  login = async () => {
    await axios
      .post(`https://conduit.productionready.io/api/users`, {
        user: {
          email: this.state.email,
          password: this.state.name,
          username: this.state.name
        }
      })
      .then(res => {
        const articles = res.data.user;
        console.log(articles);
        this.setState({
          token: articles.token
        });

        console.log(this.state.token);
      });
    // console.log("👉 Returned data:", response);
  };
  catch(e) {
    console.log(`😱 Axios request failed: ${e}`);
  }

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
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={this.onChangeMail}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>name</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChangeName}
            />
          </div>
          <button
            type="submit"
            className="btn btn btn-outline-success"
            onClick={this.login}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default FormLogIn;
