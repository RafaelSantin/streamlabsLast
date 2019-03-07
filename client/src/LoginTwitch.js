// /client/App.js
import React, { Component } from "react";
import axios from "axios";


class LoginTwitch extends Component {
  // initialize our state 
  state = {
    clientKey: 'qq9u2sryddlwz8uj59zsajuonbplr5',
  };

  constructor(props) {
    super(props);
    this.verifyTokenLogin();
  }

  verifyTokenLogin = () => {
    var str = document.location.hash;
    var res = str.split("&");
    var res2 = res[0].split("=");

    var token = window.localStorage.getItem('twtkn') || res2;

    axios.get("https://id.twitch.tv/oauth2/validate", {
        headers: {
          'Authorization': "OAuth  " + token
        }
      }).then(response => {
        //window.location = '/streamer';
        console.log(response.data.status);
      })
      .catch((error) => {
       
        console.log('error 3 ' + error);
      });
  }

  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {

    return (
      <a type="button" className="btn btn-success"
            href = {
                "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=" + this.state.clientKey + "&redirect_uri=https://streamlabslast.herokuapp.com/streamer&scope=viewing_activity_read"
            } >
          Twitch Login
      </a>

    );
  }
}

export default LoginTwitch;