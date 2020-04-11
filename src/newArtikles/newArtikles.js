import React, { Component } from "react";
import Axios from "axios";

class NewArtikles extends Component {
  postNewArticles = "https://conduit.productionready.io/api/articles/";
  state = {};

  componentDidMount() {
    const token = localStorage.getItem("token");

    this.setState({
      token,
    });
    console.log(this.state.token);
  }

  // getProfileNexState = async () => {
  //   const adapter = Axios.create({
  //     headers: {
  //       authorization: "Token " + this.state.token,
  //     },
  //   });

  //   await adapter
  //     .get(`${this.postNewArticles}${this.state.slugArticlesTitle}`)
  //     .then((res) => {
  //       const prof = res.data;
  //       console.log(prof);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  createNewrticles = async () => {
    console.log(this.state.token);
    const { title, description, body } = this.state;
    const adapter = Axios.create({
      headers: {
        authorization: "Token " + this.state.token,
      },
    });

    await adapter
      .post(this.postNewArticles, {
        article: {
          title: title,
          description: description,
          body: body,
        },
      })
      .then((res) => {
        this.setState({
          slugArticlesTitle: res.data.article.slug,
        });
        console.log(res.data);
      })
      .then(() =>
        this.props.history.push(`/article/${this.state.slugArticlesTitle}/`)
      )

      .catch((error) => {
        console.log(error.response);
      });
  };

  onPostArticlesTitle = (e) => {
    const value = e.target.value;
    this.setState({
      title: value,
    });
  };

  onPostArticlesBody = (e) => {
    const value = e.target.value;
    this.setState({
      body: value,
    });
  };

  onPostArticlesdescription = (e) => {
    const value = e.target.value;
    this.setState({
      description: value,
    });
  };

  newArticleRender() {
    return (
      <div className="col-md-10 offset-md-1 col-xs-12">
        <div>
          <div className="error-messages"></div>
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
                className="form-control form-control-lg "
                formcontrolname="title"
                placeholder="Article Title"
                type="text"
                onChange={this.onPostArticlesTitle}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control "
                formcontrolname="description"
                placeholder="What's this article about?"
                type="text"
                onChange={this.onPostArticlesdescription}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control "
                formcontrolname="body"
                placeholder="Write your article (in markdown)"
                rows="8"
                onChange={this.onPostArticlesBody}
              ></textarea>
            </div>
            <div className="form-group">
              <input
                className="form-control "
                placeholder="Enter tags"
                type="text"
              />
              <div className="tag-list"></div>
            </div>
            <button
              className="btn btn-lg  btn-success"
              type="button"
              onClick={this.createNewrticles}
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return <div>{this.newArticleRender()}</div>;
  }
}

export default NewArtikles;
