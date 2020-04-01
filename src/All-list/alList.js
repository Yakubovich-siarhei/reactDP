import React, { Component } from "react";
import AllListTags from "../render-list/render-list";
import AllFeedList from "../renderFeed/renderFeed";

import TagClickRender from "../TagClickRender/TagClickRender";

export default class AllList extends Component {
  // service = new Service();

  // _apiBase = `https://conduit.productionready.io/api`;

  state = {
    isLoading: true,
    tagrender: false,
    isLoadingYouTag: false,
    selectedItem: null
  };

  onSelectedItems = id => {
    this.setState({
      selectedItem: id,
      tagrender: true,
      isLoading: false,
      isLoadingYouTag: false
    });
  };

  onLoadingYuorFeed = () => {
    this.setState({
      isLoading: true,
      isLoadingYouTag: false,
      tagrender: false
    });
  };

  onLoadingFeed = () => {
    this.setState({
      isLoading: false,
      tagrender: false,
      isLoadingYouTag: true
    });
  };

  // onfetchDataFavorite = () => {
  //   const qwe = this.state.articles.filter(item => {
  //     return item.slug;
  //   });

  //   console.log(qwe);
  // };

  // onfetchDataFavorite = () => {
  //   const response = axios.post(
  //     `https://conduit.productionready.io/api/articles/title-of-the-article-k1q86l/favorite`,
  //     {
  //       article: {
  //         favorited: true,
  //         favoritesCount: 9
  //       }
  //     }
  //   );
  //   console.log("👉 Returned data:", response);
  // };
  // catch(e) {
  //   console.log(`😱 Axios request failed: ${e}`);
  // }

  render() {
    const { isLoading, tagrender, isLoadingYouTag } = this.state;
    const buttonTag = (
      <button className="text-light btn btn-secondary" type="button">
        {"#" + this.state.selectedItem}
      </button>
    );

    return (
      <div>
        <div>
          <nav className="navbar navbar-expand  navbar-dark bg-secondary">
            <button
              className="text-light btn btn-secondary"
              type="button"
              onClick={this.onLoadingFeed}
            >
              your feed
            </button>
            <button
              className="text-light btn btn-secondary"
              type="button"
              onClick={this.onLoadingYuorFeed}
            >
              feed all
            </button>
            {tagrender ? buttonTag : null}
          </nav>
        </div>
        <div className="d-flex">
          <div className="col-9">
            {tagrender ? (
              <TagClickRender selectedItem={this.state.selectedItem} />
            ) : null}
            {isLoading ? <AllFeedList /> : null}
            {isLoadingYouTag ? <h1>OOOOOOOOOOO</h1> : null}
          </div>
          <div className="col-3">
            <AllListTags onSelectedItems={this.onSelectedItems} />
          </div>
        </div>
      </div>
    );
  }
}
