import React, { Component } from "react";
import Spinner from "../spinner/spinner";
import axios from "axios";

class Settings extends Component {
  state = {};

  componentDidMount() {
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const bio = localStorage.getItem("bio");
    const image = localStorage.getItem("image");
    // const password = localStorage.getItem("password");

    this.setState({
      username,
      token,
      email,
      bio,
      image,
      // password,
    });
  }

  handleFormSubmit = () => {
    const {
      username,
      email,
      bio,
      image,
      // password,
    } = this.state;
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);
    localStorage.setItem("image", image);
    // localStorage.setItem("password", password);
  };

  onSettingChangeName = (e) => {
    const value = e.target.value;
    this.setState({
      username: value,
    });
  };

  onSettingChangePassword = (e) => {
    const value = e.target.value;
    this.setState({
      password: value,
    });
  };

  onSettingChangeEmail = (e) => {
    const value = e.target.value;
    this.setState({
      email: value,
    });
  };

  onSettingChangeImage = (e) => {
    const value = e.target.value;
    this.setState({
      image: value,
    });
  };

  onSettingChangeBio = (e) => {
    const value = e.target.value;
    this.setState({
      bio: value,
    });
  };

  onSettingSubmit = async () => {
    const { username, token, email, bio, image, password } = this.state;
    // if (!password) {
    //   (res) => {
    //     console.log(res);
    //   };
    // }
    const adapter = axios.create({
      headers: {
        authorization: "Token " + token,
      },
    });

    await adapter
      .put("https://conduit.productionready.io/api/user", {
        user: {
          email: email,
          username: username,
          bio: bio,
          image: image,
          password: password,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .then(this.handleFormSubmit)
      .then(() => this.props.history.push("/profile/user/"))
      .catch((error) => {
        console.log(error.response);
      });
  };

  renderFormSetting = () => {
    if (this.state.username) {
      const { username, email, bio, image } = this.state;

      return (
        <div className="m-auto pt-4" style={{ width: "70%" }}>
          <div className="d-flex justify-content-center p-3">
            <h1>Your Settings</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className=""
          >
            <div>
              <div className="form-group">
                <input
                  className="form-control "
                  formcontrolname="image"
                  placeholder="URL of profile picture"
                  defaultValue={image ? image : null}
                  type="text"
                  onChange={this.onSettingChangeImage}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg "
                  formcontrolname="username"
                  defaultValue={username}
                  type="text"
                  onChange={this.onSettingChangeName}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg "
                  formcontrolname="bio"
                  placeholder="Short bio about you"
                  defaultValue={bio ? bio : null}
                  rows="8"
                  onChange={this.onSettingChangeBio}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg "
                  formcontrolname="email"
                  defaultValue={email}
                  type="email"
                  onChange={this.onSettingChangeEmail}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg "
                  formcontrolname="password"
                  placeholder="New Password"
                  type="password"
                  onChange={this.onSettingChangePassword}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-danger">Logout.</button>
                <button
                  className="btn btn-lg btn-success "
                  type="submit"
                  onClick={this.onSettingSubmit}
                >
                  Update Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
    return <Spinner />;
  };
  render() {
    return <div>{this.renderFormSetting()}</div>;
  }
}

export default Settings;
