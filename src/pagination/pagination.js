import React, { Component } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";

class Paginations extends Component {
  state = {
    activePage: 1,
    users: null
  };

  //   handlePageChange(pageNumber) {
  //     console.log(`active page is ${pageNumber}`);
  //     this.setState({ activePage: pageNumber });
  //   }

  onMakePage = pageNumber => {
    axios
      .get(
        `https://conduit.productionready.io/api/articles?limit=10&offset=${pageNumber}`
      )
      .then(res => {
        const articles = res.data;
        this.setState({
          users: articles.articles
        });
        console.log(this.state.users);
      });
  };

  render() {
    const { activePage } = this.state;
    return (
      <div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={500}
          pageRangeDisplayed={10}
          onChange={this.onMakePage}
        />
      </div>
    );
  }
  //   state = {
  //     users: null,
  //     total: null,
  //     per_page: 10,
  //     current_page: 1
  //   };

  //   componentDidMount() {
  //     this.makeHttpRequestWithPage(1);
  //   }

  //   makeHttpRequestWithPage = pageNumber => {
  //     axios
  //       .get(
  //         `https://conduit.productionready.io/api/articles?limit=10&offset=${pageNumber}`
  //       )
  //       .then(res => {
  //         const articles = res.data;
  //         this.setState({
  //           users: articles.articles,
  //           total: articles.articlesCount
  //         });
  //         console.log(articles);
  //       });
  //   };

  //   makeHttpRequestWithPage = async pageNumber => {
  //     const response = await fetch(
  //       `https://reqres.in/api/users?page=${pageNumber}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );

  //     const data = await response.json();

  //     this.setState({
  //       users: data.data,
  //       total: data.total,
  //       per_page: data.per_page,
  //       current_page: data.page
  //     });
  //   };

  //   render() {
  //     const { users, total, per_page } = this.state;
  //     const autor = users.map(user => (
  //       <tr key={user.id}>
  //         <td>{user.id}</td>
  //         <td>{user.first_name}</td>
  //         <td>{user.last_name}</td>
  //       </tr>
  //     ));

  //     if (users !== null) {
  //       return autor;
  //     }

  //     const pageNumbers = [];
  //     if (this.state.total !== null) {
  //       for (
  //         let i = 1;
  //         i <= Math.ceil(this.state.total / this.state.per_page);
  //         i++
  //       ) {
  //         pageNumbers.push(i);
  //       }

  //       renderPageNumbers = pageNumbers.map(number => {
  //         let classes = this.state.current_page === number ? styles.active : "";

  //         return (
  //           <span
  //             key={number}
  //             className={classes}
  //             onClick={() => this.makeHttpRequestWithPage(number)}
  //           >
  //             {number}
  //           </span>
  //         );
  //       });
  //     }

  //     return (
  //       <div className={styles.app}>
  //         <table className={styles.table}>
  //           <thead>
  //             <tr>
  //               <th>S/N</th>
  //               <th>First Name</th>
  //               <th>Last Name</th>
  //             </tr>
  //           </thead>
  //           <tbody>{users}</tbody>
  //         </table>

  //         <div className={styles.pagination}>
  //           <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
  //           {renderPageNumbers}
  //           <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
  //         </div>
  //       </div>
  //     );
  //   }
}

export default Paginations;
