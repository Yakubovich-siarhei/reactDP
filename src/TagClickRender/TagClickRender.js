import React, { Component } from "react";

import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Pagination from "react-js-pagination";

import Spinner from "../spinner/spinner";

export default class TagClickRender extends Component {
  state = {
    articles: [],
    activePage: 1,
    total: 0,
    loading: true
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.selectedItem !== this.props.selectedItem) {
      this.setState({ loading: true });
      this.fetchData(this.props.selectedItem);
    }
  }

  fetchData = async (selectedItem, pageNumber) => {
    await axios
      .get(
        `https://conduit.productionready.io/api/articles?tag=${selectedItem}&limit=10&offset=${pageNumber}`
      )
      .then(res => {
        const articles = res.data;
        this.setState({
          articles: articles.articles,
          total: articles.articlesCount,
          activePage: pageNumber,
          loading: false
        });
      });
  };

  allFeed = () => {
    const { articles, activePage, total } = this.state;

    const pagin = (
      <Pagination
        innerClass={"btn-group mr-2"}
        activeClass={"paginClassActive btn btn-secondary"}
        itemClass={"paginClassDefault btn btn-secondary bg-dark"}
        linkClass={"text-white"}
        activeLinkClass={"text-success"}
        activePage={activePage}
        totalItemsCount={total}
        pageRangeDisplayed={15}
        onChange={this.fetchData}
        hideNavigation
        // hideFirstLastPages
      />
    );

    // if (articles) {
    return (
      <div>
        {articles.map((feed, index) => {
          return (
            <div className="feed border-top" key={index}>
              <div>
                <p className="h5">{feed.title}</p>
              </div>

              <div className="align-middle">
                <button
                  className="btn btn-sm btn-outline-success float-right"
                  // onClick={this.onfetchDataFavorite}
                >
                  <FavoriteIcon />
                  {feed.favoritesCount}
                </button>
              </div>

              <div>
                <ul className="list-group">
                  <li className="list-group-item border-0">
                    title list: {feed.slug}
                  </li>
                  <li className="list-group-item border-0">
                    name autor: {feed.author.username}
                  </li>
                  <li className="list-group-item border-0">
                    tagList: {feed.tagList}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
        {pagin}
      </div>
    );
    // }   return null;
  };

  render() {
    const { loading } = this.state;
    const items = this.allFeed();

    const spinner = loading ? <Spinner /> : null;

    const content = !spinner ? items : null;
    return (
      <div>
        {spinner}
        {content}
      </div>
    );
  }
}

// TagClickRender.defaultProps = {
//   selectedItem: "tag"
// };
