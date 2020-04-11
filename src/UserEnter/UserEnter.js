import React, { Component } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";
import "./UserEnter.css";
import { withRouter } from "react-router-dom";

class UserEnter extends Component {
  user = this.props.match.params.user;
  username = localStorage.getItem("username");
  token = localStorage.getItem("token");

  state = {
    show: false,
    active: "",
  };

  componentDidMount() {
    this.onLoadUser();

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    this.setState({ username, token });
  }

  onLoadUser = async () => {
    // const { username } = this.state;
    // const username = localStorage.getItem("username");
    // const asdas =
    await axios
      .get(`https://conduit.productionready.io/api/profiles/${this.user}`)
      .then((res) => {
        const userProf = res.data.profile;
        this.setState({
          username: userProf.username,
          userImg: userProf.image,
        });
        console.log(userProf);
      });
    // .then(this.onLoad)
    // .catch(this.onPushHistory);
    // console.log(asdas);
    // return asdas;
  };

  onFilterStyle = (event) => {
    this.setState({
      active: event.target.id,
    });
  };

  // onFilterStyle= () => {
  //   this.setState({
  //     show: !this.state.show,
  //   });
  // };

  // onStyle = (id) => {
  //   this.setState((prevState) => {
  //     const nextState = prevState.stateTodo.map((item) => {
  //       if (item.id === id) {
  //         item.show = !item.show;
  //       }
  //       return item;
  //     });
  //     return {
  //       stateTodo: nextState,
  //     };
  //   });
  // };
  // activeCorrectFilter = (event) => {
  //   this.setState({
  //     active: event.target.id,
  //   });
  //   console.log(this.state.active);
  // };

  activeCorrectFilter = (event) => {
    this.setState({
      active: event.target.id,
    });
    console.log("id" + event.target.id);
  };

  // onLoadNavBar = () => {
  //   const {
  //     // show,
  //     active,
  //   } = this.state;

  //   const arr = [
  //     { id: 1, items: "111" },
  //     { id: 2, items: "222" },
  //   ];

  //   // let classNames = "p-4";

  //   // if (show) {
  //   //   classNames += " show";
  //   // }

  //   const elements = arr.map((item) => {
  //     const { id, items } = item;
  //     // const style = {
  //     //   color: show ? "rgb(76, 219, 107)" : "black",
  //     //   borderBottom: show ? "solid 2px rgb(4, 97, 27)" : "none",
  //     // };
  //     console.log("inem id = " + id);
  //     return (
  //       <div
  //         key={id}
  //         id={id}
  //         className={
  //           "bl_filter__link " + (active === id ? "active" : "active2")
  //         }
  //         // style={style}
  //         onClick={this.onFilterStyle}
  //       >
  //         {items}
  //       </div>
  //     );
  //   });

  //   return <div className="d-flex">{elements}</div>;
  // };

  onSelectItemSettings = () => {
    this.username === this.state.username
      ? this.props.history.push(`/settings/`)
      : this.followUser();
  };

  followUser = async () => {
    const url = `https://conduit.productionready.io/api/profiles/${this.user}/follow`;
    const adapter = axios.create({
      headers: {
        authorization: "Token " + this.token,
      },
    });
    await adapter.post(url, {});
  };
  onPushHistory = () => {
    this.props.history.push("/");
  };

  onLoad = () => {
    if (!this.state.username) {
      return <Spinner />;
    } else
      return (
        <div className="wripper">
          <div className="bg-light">
            <div className="username m-auto" style={{ width: "70%" }}>
              <div
                className="usernavbar navbar bg-light justify-content-center mx-auto"
                style={{ height: "250px" }}
                // className="d-flex align-items-center flex-column"
              >
                <div className="">
                  <img
                    className="rounded-circle mb-2"
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundSize: "cover",
                    }}
                    src={this.state.userImg}
                    alt={this.state.username}
                  ></img>
                  <div>{this.state.username} </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => {
                    this.onSelectItemSettings();
                  }}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  {this.state.username === this.username
                    ? "edit profile"
                    : "follow profile"}
                </button>
              </div>
            </div>
          </div>
          {/* {this.onLoadNavBar()} */}
          <div className="d-flex">
            <div className="p-4">
              <div
                id="1"
                onClick={this.activeCorrectFilter}
                className={
                  "bl_filter__link " +
                  (this.state.active === "1" ? "active" : "")
                }
              >
                My Posts
              </div>
            </div>
            <div className="p-4">
              <div
                id="2"
                className={
                  "bl_filter__link " +
                  (this.state.active === "2" ? "active" : "")
                }
                onClick={this.activeCorrectFilter}
              >
                Faforites post
              </div>
            </div>
          </div>
        </div>
      );
  };

  onLoadUserProfile = () => {
    // const { token } = this.state;
    const content = <div>{this.onLoad()}</div>;
    // (
    //   <div>
    //     {token
    //       ? this.onLoad()
    //       : () => {
    //           this.onPushHistory();
    //         }}
    //   </div>
    // );
    return content;
  };

  render() {
    const onLoadUserProfile = this.onLoadUserProfile();
    return <div>{onLoadUserProfile}</div>;
  }
}
// export default UserEnter;
export default withRouter(UserEnter);
