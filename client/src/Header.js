// /client/App.js
import React, { Component } from "react";
import axios from "axios";

class Header extends Component {
    constructor(props) {
        super(props);     
        this.storeToken()
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
                // If request is good...
                console.log(response.data.status);
            })
            .catch((error) => {
                console.log('error 3 ' + error);
            });
    }

    storeToken = () => {
       var str = document.location.hash;
       var res = str.split("&");
       var res2 = res[0].split("=");

       window.localStorage.setItem('twtkn', res2);

   }
  render() {

    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#"><img className="twitch-icon-header" src={process.env.PUBLIC_URL + '/twitch.png'}/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Streamlab <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>                    
                </div>
            </nav>     
        </div>    

    );
  }
}

export default Header;