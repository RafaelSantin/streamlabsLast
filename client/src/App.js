// /client/App.js

import React, { Component } from "react";
import LoginTwitch from "./LoginTwitch";
import Header from "./Header";


class App extends Component {
  // initialize our state 
  state = {
    data: [],
    intervalIsSet: false,
    teste: 'no timestamp yet',
  };

  constructor(props) {
    super(props);

  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Header/>
        <LoginTwitch/>
      </React.Fragment>
    );
  }
}

export default App;