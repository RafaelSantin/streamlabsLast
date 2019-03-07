// /client/App.js
import React, { Component } from "react";
import { subscribeToTimer } from './api';


class Followers extends Component {
  // initialize our state 
  state = {
    followers: [],
  };

  constructor(props) {
    super(props);
    subscribeToTimer((err, newfollow) => this.setState(state => {
        const followersNew = [...state.followers, newfollow];
        let followers = followersNew;
        if (followersNew.length > 10)
        {
          followers = followersNew.slice(followersNew.length - 10);
        }         
        
        return {
          followers
        };
      })
    )
  }



  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {this.state.followers.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div> 
    );
  }
}

export default Followers;