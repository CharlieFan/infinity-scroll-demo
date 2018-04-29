import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

import ImageBox from "./ImageBox";
import Observer from "./Observer";

class App extends Component {
  componentDidMount() {
    this.getUsers(this.state.page);

    let options = {
      root: null, // Page as root
      rootMargin: "0px",
      threshold: 1.0
    };

    // Create an observer
    this.observer = new IntersectionObserver(this.handleObserver, options);

    //Observ the `loadingRef`
    this.observer.observe(this.loadingRef);
  }

  render() {
    const loadingCss = {
      height: "100px",
      margin: "30px"
    };

    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Infinity Scroll + Lazy Loading Demo</h1>
        </header>

        <div style={{ minHeight: "800px" }}>
          <ul>
            {this.state.users.map(user => {
              return (
                <li key={user.id}>
                  <Observer>
                    {isVisible => (
                      <ImageBox url={user.avatar_url} isVisible={isVisible} />
                    )}
                  </Observer>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCss}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }

  state = {
    users: [],
    loading: false,
    page: 0,
    prevY: 0
  };

  getUsers = page => {
    this.setState({ loading: true });
    axios
      .get(`https://api.github.com/users?since=${page}&per_page=100`)
      .then(res => {
        this.setState({ users: [...this.state.users, ...res.data] });
        this.setState({ loading: false });
      });
  };

  handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;
    console.table(entities);
    if (this.state.prevY > y) {
      const lastUser = this.state.users[this.state.users.length - 1];
      const curPage = lastUser.id;
      this.getUsers(curPage);
      this.setState({ page: curPage });
    }

    this.setState({ prevY: y });
  };
}

export default App;
