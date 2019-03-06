// /client/App.js

import React, { Component } from "react";
import axios from "axios";
import { subscribeToTimer } from './api';
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
    subscribeToTimer((err, teste) => this.setState({
      teste
    }));
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    if (!this.state.intervalIsSet) {
      // let interval = setInterval(this.getDataFromDb, 1000);
      // this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };




  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
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