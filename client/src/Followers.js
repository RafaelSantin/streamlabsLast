// /client/App.js
import React, { Component } from "react";
import { subscribeToTimer } from './api';


class Followers extends Component {
  // initialize our state 
  state = {
    teste: 'no timestamp yet',
  };

  constructor(props) {
    super(props);
    subscribeToTimer((err, teste) => this.setState({
      teste
    }));
  }



  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (

      <p className="App-intro">
      This is the timer value lalala: {
        this.state.teste
      }
      </p>

    );
  }
}

export default Followers;