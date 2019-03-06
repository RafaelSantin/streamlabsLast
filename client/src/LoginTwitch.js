// /client/App.js
import React, { Component } from "react";


class LoginTwitch extends Component {
  // initialize our state 
  state = {
    clientKey: 'qq9u2sryddlwz8uj59zsajuonbplr5',
  };

  constructor(props) {
    super(props);
  }



  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {

    return (
      <a type="button" className="btn btn-success"
            href = {
                "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=" + this.state.clientKey + "&redirect_uri=http://localhost:3000/streamer&scope=viewing_activity_read"
            } >
          Twitch Login
      </a>

    );
  }
}

export default LoginTwitch;