// /client/App.js

import React, { Component } from "react";
import axios from "axios";
import { subscribeToTimer } from './api';
import Followers from "./Followers";
import Header from "./Header";
import TwitchPlayer from "./TwitchPlayer";

const CLIENTID = 'qq9u2sryddlwz8uj59zsajuonbplr5';
const CLIENTSECRET = 'yi5et88qjhe66ctav7ohweguthaann';

class Streamer extends Component {
  // initialize our state 
  state = {
    data: [],
    intervalIsSet: false,
    streamer:'',
    teste: 'no timestamp yet',
    showStream: false,
    textButton: "Let's Watch"
  };

  constructor(props) {
    super(props);
    subscribeToTimer((err, teste) => this.setState({
      teste
    }));

    this.handleChange = this.handleChange.bind(this);
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

  showStreamHandle = () => {
      if(this.state.streamer == '')
      {
        alert('A Streamer is necessary to continue');
      }else{
        this.setState({showStream:true});
        this.setState({textButton: 'Watching'});
        this.getTwitchUserId();
        this.getTokenSubscribe();
      }
  }

  getTwitchUserId = () => {
    axios.get("https://api.twitch.tv/helix/users?login=" + this.state.streamer, {
        headers: {
          'Client-ID': this.CLIENTID
        }
      }).then(response => {
        // If request is good...
        console.log(response.data.data[0].id);
        this.setState({streamerId: response.data.data[0].id});
      })
      .catch((error) => {
        console.log('error 3 ' + error);
      });
  }

  getTokenSubscribe = () => {
        axios.post("https://id.twitch.tv/oauth2/token?client_id=" + CLIENTID+"&client_secret="+CLIENTSECRET+"&grant_type=client_credentials", {}).then(response => {
            // If request is good...
            console.log(response.data.access_token);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });
  }

  setWebhookSubscribe = () => {
        var headers = {
          'Content-Type': 'application/json',
          'Client-ID': this.CLIENTEID
        }
        axios.post("https://api.twitch.tv/helix/webhooks/hub", 
        {
          'hub.callback':  'localhost:3001/api/putData',
          'hub.mode': 'subscribe',
          'hub.topic': 'https://api.twitch.tv/helix/users/follows?first=10&to_id='+this.state.streamerId,
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



  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Header/>
        <Followers></Followers>
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
      </React.Fragment>
    );
  }
}

export default Streamer;