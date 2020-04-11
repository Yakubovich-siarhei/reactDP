import React, { Component } from "react";

import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Pagination from "react-js-pagination";
import Moment from "moment";

import Spinner from "../spinner/spinner";

import { withRouter } from "react-router-dom";

class AllFeedList extends Component {
  token = localStorage.getItem("token");
  state = {
    articles: [],
    activePage: 1,
    total: 0,
    loading: true,
  };

  // componentDidMount() {
  //   this.fetchData();
  // }

  componentDidUpdate(prevProps) {
    this.fetchData();
    // console.log(prevProps);
    if (prevProps.selectedItem !== this.props.selectedItem) {
      this.setState({ loading: true });
      this.fetchData(this.props.selectedItem);
    }
  }

  fetchData = async (selectedItem, pageNumber) => {
    const getTags = `https://conduit.productionready.io/api/articles?tag=${selectedItem}&limit=10&offset=${pageNumber}`;
    const noTags = `https://conduit.productionready.io/api/articles?limit=10&offset=${pageNumber}`;
    const selectGet = selectedItem ? getTags : noTags;
    await axios.get(selectGet).then((res) => {
      const articles = res.data;
      this.setState({
        articles: articles.articles,
        total: articles.articlesCount,
        activePage: pageNumber,
        loading: false,
      });
    });
  };

  onFavoriteLikePost = async (id) => {
    const fav = `https://conduit.productionready.io/api/articles/${id}/favorite`;
    const adapter = axios.create({
      headers: {
        authorization: "Token " + this.token,
      },
    });

    const postFavor = adapter.post(fav, {});
    await postFavor
      .then((res) => {
        console.log(res.data.article.favorited);
      })
      .catch((res) => {
        console.log(res.response);
      });
  };

  onFavoriteLikeDel = async (id) => {
    const fav = `https://conduit.productionready.io/api/articles/${id}/favorite`;
    const adapter = axios.create({
      headers: {
        authorization: "Token " + this.token,
      },
    });

    const delFavor = adapter.delete(fav, {});
    await delFavor
      .then((res) => {
        console.log(res.data.article.favorited);
      })
      .catch((res) => {
        console.log(res.response);
      });
  };

  onFavoriteLike = async (id) => {
    const adapter = axios.create({
      headers: {
        authorization: "Token " + this.token,
      },
    });

    const getFavor = adapter.get(
      `https://conduit.productionready.io/api/articles/${id}`
    );

    await getFavor
      .then((res) => {
        this.setState({
          favoriteArticle: res.data.article.favorited,
        });
        console.log(res);
      })
      .then(
        this.state.favoriteArticle
          ? this.onFavoriteLikeDel(id)
          : this.onFavoriteLikePost(id)
      )
      .catch((res) => {
        console.log(res.response);
      });
  };

  onSelectItemArticles = (id) => {
    this.props.history.push(`/article/${id}/`);
  };

  onSelectItemUser = (id) => {
    this.props.history.push(`/profile/${id}/`);
  };

  datePictyre(dt) {
    Moment.locale("en");
    return <span> {Moment(dt).format("d MMMM YYYY")} </span>;
  }

  allFeed = () => {
    const { articles, activePage, total } = this.state;
    const pageRangeDisplayedNumber = window.innerWidth / 100;

    const pagin = (
      <Pagination
        innerClass={"btn-group mr-2"}
        activeClass={"paginClassActive btn btn-secondary"}
        itemClass={"paginClassDefault btn btn-secondary bg-dark"}
        linkClass={"text-white"}
        activeLinkClass={"text-success"}
        activePage={activePage}
        totalItemsCount={total}
        pageRangeDisplayed={pageRangeDisplayedNumber}
        onChange={this.fetchData}
        hideNavigation
        // hideFirstLastPages
      />
    );

    const styleImage = {
      width: "40px",
      height: "40px",
      backgroundSize: "cover",
      borderRadius: "50%",
    };

    const wer = (
      <div className="">
        {articles.map((feed, index) => {
          return (
            <div className="feed border-top col-12 " key={index}>
              <div className="article-meta d-flex justify-content-between">
                <div className="d-flex pt-2 align-items-center">
                  <img alt=" " src={feed.author.image} style={styleImage} />
                  <div className="">
                    <div
                      className="author text-success"
                      onClick={() => {
                        this.onSelectItemUser(feed.author.username);
                      }}
                    >
                      {feed.slug}
                    </div>
                    <span className="date" style={{ fontSize: "14px" }}>
                      {this.datePictyre(feed.createdAt)}
                    </span>
                  </div>
                </div>

                <button
                  className={
                    "btn btn-sm btn-outline-success p-0 d-flex  align-self-center justify-content-center " +
                    (this.state.favoriteArticle
                      ? "btn-success text-light"
                      : "btn-outline-success")
                  }
                  style={{ width: "40px", height: "30px" }}
                  onClick={() => {
                    this.onFavoriteLike(feed.slug);
                  }}
                >
                  <FavoriteIcon style={{ width: "18px" }} />
                  {feed.favoritesCount}
                </button>
              </div>
              <div
                className="preview-link pt-3"
                onClick={() => {
                  this.onSelectItemArticles(feed.slug);
                }}
              >
                <h3>{feed.title}</h3>
                <p className="pt-4">{feed.description}</p>
                <span style={{ fontSize: "14px" }}>Read more...</span>
                <ul className="tag-list"></ul>
              </div>
            </div>
          );
        })}
        {pagin}
      </div>
    );

    return <div>{wer}</div>;
  };

  render() {
    const { loading } = this.state;
    const items = this.allFeed();

    const spinner = loading ? <Spinner /> : null;

    const content = !spinner ? items : null;
    return (
      <div className="col-xs-6">
        {spinner}
        {content}
      </div>
    );
  }
}

export default withRouter(AllFeedList);
