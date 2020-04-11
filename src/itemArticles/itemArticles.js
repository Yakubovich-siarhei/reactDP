import React, { Component } from "react";
import Axios from "axios";
import Spinner from "../spinner/spinner";

import Moment from "moment";

class ItemArticles extends Component {
  slug = this.props.match.params.slug;
  token = localStorage.getItem("token");
  username = localStorage.getItem("username");
  postNewArticles = "https://conduit.productionready.io/api/articles/";
  state = {};

  componentDidMount() {
    const token = localStorage.getItem("token");

    this.setState({
      token,
    });
    this.rend();
  }

  // componentDidUpdate() {
  //   this.rend();
  // }

  setToken() {
    const token = localStorage.getItem("token");

    this.setState({
      token,
    });
  }

  rend = async () => {
    if (this.token) {
      return this.getProfileNexState().then(this.getProfileComments());
    }
    return <Spinner />;
  };

  getProfileNexState = async () => {
    console.log(this.token);
    const adapter = Axios.create({
      headers: {
        authorization: "Token " + this.token,
      },
    });

    await adapter
      .get(`${this.postNewArticles}${this.slug}`)
      .then((res) => {
        const prof = res.data.article;
        this.setState({
          title: prof.title,
          authorImage: prof.author.image,
          authorName: prof.author.username,
          createdAt: prof.createdAt,
          favoritesCount: prof.favoritesCount,
          articleBody: prof.body,
        });
        console.log(prof);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  getProfileComments = async () => {
    const adapter = Axios.create({
      headers: {
        authorization: "Token " + this.token,
      },
    });

    await adapter
      .get(`${this.postNewArticles}${this.slug}/comments`)
      .then((res) => {
        const comemnt = res.data;
        console.log(comemnt);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  datePictyre(dt) {
    Moment.locale("en");
    return <span> {Moment(dt).format("d MMMM YYYY")} </span>;
  }

  onSelectAutor = () => {
    this.props.history.push(`/profile/${this.state.authorName}`);
  };

  articlePage = (color) => {
    const { authorImage, authorName, createdAt, favoritesCount } = this.state;
    const onSelectAutor = this.onSelectAutor;
    function linkName() {
      return (
        <div
          className={color}
          onClick={() => {
            onSelectAutor();
          }}
        >
          {authorName}
        </div>
      );
    }

    const styleImage = {
      width: "20px",
      height: "20px",
      backgroundSize: "cover",
      borderRadius: "50%",
    };

    const editArticle = (
      <div>
        <button className="btn btn-sm btn-outline-secondary">
          Edit Article
        </button>
        <button className="btn btn-sm btn-outline-danger">
          Delete Article
        </button>
      </div>
    );

    const followUser = (
      <div>
        <button className="btn btn-sm action-btn btn-outline-secondary">
          + Follow {" " + authorName}
        </button>
        <button className="btn btn-sm btn-outline-success">
          Favorite Article
          <span className="counter">{" (" + favoritesCount + ")"}</span>
        </button>
      </div>
    );

    const contentButton =
      this.username === authorName ? editArticle : followUser;

    return (
      <div className="article-meta d-flex">
        {/* ssylka na profile */}
        <div>
          <img alt="" src={authorImage} style={styleImage} />
        </div>
        <div className="info flex-column">
          {linkName(color)}
          <span className="date"> {this.datePictyre(createdAt)} </span>
        </div>
        {contentButton}
      </div>
    );
  };

  renderArticles = () => {
    const { title, articleBody } = this.state;

    return (
      <div className="article-page">
        <div className="banner  bg-dark">
          <div className="container">
            <h1>{title}</h1>
            {this.articlePage("text-light")}
          </div>
        </div>
        <div>{articleBody}</div>
        <div className="container page pt-4 col-9 m-auto">
          {this.articlePage("text-success")}

          <div className="col-xs-12 col-md-8 offset-md-2">
            <div>
              <ul className="error-messages"></ul>
              <form
                className="card comment-form "
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div>
                  <div className="card-block">
                    <textarea
                      className="form-control "
                      placeholder="Write Link comment..."
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-sm btn-primary" type="submit">
                      Post Comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return <div>{this.renderArticles()}</div>;
  }
}

export default ItemArticles;
