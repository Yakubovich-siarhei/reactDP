import React, { Component } from "react";
import Spinner from "../spinner/spinner";
import axios from "axios";

class Settings extends Component {
  state = {
    // username: null,
    // email: null,
    // image: null,
  };

  componentDidMount() {
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const createdAt = localStorage.getItem("createdAt");
    const updatedAt = localStorage.getItem("updatedAt");
    const bio = localStorage.getItem("bio");
    const image = localStorage.getItem("image");

    this.setState({
      username,
      token,
      email,
      id,
      createdAt,
      updatedAt,
      bio,
      image,
    });
  }

  handleFormSubmit = () => {
    const {
      username,
      token,
      email,
      id,
      createdAt,
      updatedAt,
      bio,
      image,
    } = this.state;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("id", id);
    localStorage.setItem("createdAt", createdAt);
    localStorage.setItem("updatedAt", updatedAt);
    localStorage.setItem("bio", bio);
    localStorage.setItem("image", image);
  };

  onSettingChangeName = (e) => {
    const value = e.target.value;
    this.setState({
      username: value,
    });
    console.log("username = " + this.state.username);
  };

  onSettingChangeEmail = (e) => {
    const value = e.target.value;
    this.setState({
      email: value,
    });
    console.log("email = " + this.state.email);
  };

  onSettingChangeImage = (e) => {
    const value = e.target.value;
    this.setState({
      image: value,
    });
    console.log("image = " + this.state.image);
  };

  onSettingSubmit = async () => {
    await axios
      .put("https://conduit.productionready.io/api/user", {
        user: {
          id: 91033,
          email: "covid19covid19@m.r",
          createdAt: "2020-04-01T11:26:28.313Z",
          updatedAt: "2020-05-05T22:15:49.140Z",
          username: "covid19covid19",
          bio: null,
          image:
            "https://hubpng.com/public/uploads/preview/coronavirus-png-image-hd-covid-19-11583095191dm7kk82js9.png",
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OTEwMzMsInVzZXJuYW1lIjoiY292aWQxOWNvdmlkMTkiLCJleHAiOjE1OTEzMDg5NDl9.S6DZjVJYflqMp3oa-YFMOhChqZ2NsCwVo75BTCUUDJA",
          password: "covid19covid19covid19covid19",
        },
      })
      .then(this.handleFormSubmit)
      .catch((error) => {
        console.log(error);
      });
  };

  renderFormSetting = () => {
    if (this.state.username) {
      const { username, email } = this.state;

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
                  rows="8"
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
