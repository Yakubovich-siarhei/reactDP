import React, { Component } from "react";
import axios from "axios";

import Spinner from "../spinner/spinner";

export default class AllListTags extends Component {
  state = {
    tags: [],
    loading: true,
    taggg: null
  };

  componentDidMount() {
    this.fetchAllTag();
  }

  fetchAllTag = async () => {
    return await axios
      .get(`https://conduit.productionready.io/api/tags`)
      .then(res => {
        const tags = res.data;
        this.setState({ tags: tags.tags, loading: false });

        // console.log(this.state.tags);
      });
  };

  tgs = () => {
    // console.log(this.props);
    const tagis = this.state.tags;
    return (
      <div className="">
        {tagis.map(tag => {
          const id = tag.toString();
          return (
            <button
              className="badge badge-secondary border-0 mr-1"
              type="button"
              key={id}
              onClick={() => {
                this.props.onSelectedItems(tag);
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    const tagi = this.tgs();

    const spinner = loading ? <Spinner /> : null;
    const content = !spinner ? tagi : null;
    return (
      <div>
        {spinner}
        {content}
      </div>
    );
  }
}
