// /client/App.js

import React, { Component } from "react";
import axios from "axios";
import Followers from "./Followers";
import Header from "./Header";
import TwitchPlayer from "./TwitchPlayer";

const CLIENTID = 'qq9u2sryddlwz8uj59zsajuonbplr5';
const CLIENTSECRET = 'yi5et88qjhe66ctav7ohweguthaann';

class Streamer extends Component {

  state = {
    data: [],
    intervalIsSet: false,
    streamer:'',
    streamerId:0,
    teste: 'no timestamp yet',
    showStream: false,
    textButton: "Let's Watch"
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.unsubscribeAllWebhook();
    this.storeToken();

    this.verifyTokenLogin();
  }

  componentWillUnmount() {
    this.unsubscribeAllWebhook();
  }

  

  verifyTokenLogin = () => {
    var str = document.location.hash;
    var res = str.split("&");
    var res2 = res[0].split("=");

    var token = window.localStorage.getItem('twtkn') || res2;

    axios.get("https://id.twitch.tv/oauth2/validate", {
        headers: {
          'Authorization': "OAuth " + token
        }
      }).then(response => {
        // If request is good...
        console.log(response.data.status);
      })
      .catch((error) => {
        window.location = '/';
        console.log('error 3 ' + error);
      });
  }

  storeToken = () => {
    var str = document.location.hash;
    var res = str.split("&");
    var res2 = res[0].split("=");

    if (res2[1] !== undefined)
    {
      window.localStorage.setItem('twtkn', res2[1]);
    }
  }

  showStreamHandle = () => {
      if(this.state.streamer == '')
      {
        alert('A Streamer is necessary to continue');
      }else{
        this.setState({showStream:true});
        this.setState({textButton: 'Watching'});
        this.getTwitchUserId();       
      }
  }

  getTwitchUserId = () => {
    axios.get("https://api.twitch.tv/helix/users?login=" + this.state.streamer, {
        headers: {
          'Client-ID': CLIENTID
        }
      }).then(response => {
        // If request is good...
        
        console.log(response.data.data[0].id);
        this.setState({streamerId: response.data.data[0].id});

        this.setWebhookSubscribe();
      })
      .catch((error) => {
        console.log('error 3 ' + error);
      });
  }

  getTokenSubscribe = () => {
          axios.post("https://id.twitch.tv/oauth2/token?client_id=" + CLIENTID+"&client_secret="+CLIENTSECRET+"&grant_type=client_credentials", {}).then(response => {
            // If request is good...
            console.log(response.data.access_token);
                axios.get("https://api.twitch.tv/helix/webhooks/subscriptions", {
                    headers: {
                      'Authorization': "Bearer " + response.data.access_token
                    }
                  }).then(respone => {
                    // If request is good...
                    var headers = {
                      'Content-Type': 'application/json',
                      'Client-ID': CLIENTID
                    }
                    respone.data.data.forEach(element => {
                      axios.post("https://api.twitch.tv/helix/webhooks/hub", {
                          'hub.callback': element.callback,
                          'hub.mode': 'unsubscribe',
                          'hub.topic': element.topic
                        }, {
                          headers: headers
                        }).then(resptwo => {
                          // If request is good...
                          console.log(resptwo.data);
                        })
                        .catch((error) => {
                          console.log('error 3 ' + error);
                        });                      
                    });
                  })
                  .catch((error) => {
                    console.log('error 3 ' + error);
                  });
            
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });
  }

  setWebhookSubscribe = () => {
        var headers = {
          'Content-Type': 'application/json',
          'Client-ID': CLIENTID
        }
        axios.post("https://api.twitch.tv/helix/webhooks/hub", 
        {
          'hub.callback':  'https://streamlabslast.herokuapp.com/api/webhook',
          'hub.mode': 'subscribe',
          'hub.topic': 'https://api.twitch.tv/helix/users/follows?first=1&to_id='+this.state.streamerId,
          'hub.lease_seconds': '864000'
        }, {headers: headers}).then(response => {
            // If request is good...
            console.log(response.data);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });
  }

   handleChange(event) {      
       this.setState({
           [event.target.name]: event.target.value
       });
   }

   unsubscribeAllWebhook = () => {
      this.getTokenSubscribe();
   }



  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Header/>
        
        < div className = "col-sm-12" >
          <div className="col-sm-3">
            <input type="text" className="form-control" name="streamer" value={this.state.streamer} onChange={this.handleChange}></input>
          </div>
          <div className="col-sm-3" >
            <button className="btn btn-success" onClick={this.showStreamHandle}>{this.state.textButton}</button>
          </div>
        </div>
        <div className="col-sm-8">
          {this.state.showStream ? < TwitchPlayer channel={this.state.streamer}></TwitchPlayer> : null}
        </div>
        <div className="col-sm-4">
          {this.state.showStream ? <Followers></Followers> : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Streamer;