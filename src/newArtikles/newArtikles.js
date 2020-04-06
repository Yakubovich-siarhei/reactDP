import React, { Component } from "react";
import Axios from "axios";

class NewArtikles extends Component {
  postNewArticles = "https://conduit.productionready.io/api/articles/";

  // article: {
  //   tagList: [],
  //   title: "covid19covid19",
  //    description: "covid19covid19",
  //    body: "covid19 await covid21"}

  get1 = `https://conduit.productionready.io/api/articles/covid19covid19-6yro11`;

  //   article:{title: "covid19covid19"
  //   slug: "covid19covid19-6yro11"
  //   body: "covid19 await  covid21"
  //   createdAt: "2020-04-06T20:07:31.467Z"
  //   updatedAt: "2020-04-06T20:07:31.467Z"
  //   tagList: []
  //   description: "covid19covid19",
  //   author: {username: "covid19covid19", bio: "2", image: "1", following: false},
  //   favorited: false
  // favoritesCount: 0
  // }
  getComments = `https://conduit.productionready.io/api/articles/covid19covid19-6yro11/comments`;
  // comments:[]

  createNewrticles = async () => {
    await Axios.put(this.postNewArticles, {
      article: {
        tagList: [],
        title: "covid19_2",
        description: "covid19_2",
        body: "covid19 await _2",
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
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
              />
            </div>
            <div className="form-group">
              <input
                className="form-control "
                formcontrolname="description"
                placeholder="What's this article about?"
                type="text"
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control "
                formcontrolname="body"
                placeholder="Write your article (in markdown)"
                rows="8"
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
