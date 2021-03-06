// /client/App.js
import React, { Component } from "react";
import { subscribeToWebhooker } from './api';


class Followers extends Component {
  // initialize our state 
  state = {
    followers: [],
  };

  constructor(props) {
    super(props);

     subscribeToWebhooker((err, newfollow) => this.setState(state => {
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