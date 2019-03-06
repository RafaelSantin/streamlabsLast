import React, { Component } from "react";

const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

class TwitchPlayer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {   
        let embed;
        const script = document.createElement('script');
        script.setAttribute(
            'src',
            EMBED_URL
        );

        script.addEventListener('load', () => {
            embed = new window.Twitch.Embed(this.props.targetID, { ...this.props });
        });
        console.log(this.props.targetID);
        document.body.appendChild(script);
     }

  render() {

    return (
        <div>            
            <div id={this.props.targetID}></div>
        </div>
    )
  }
}
TwitchPlayer.defaultProps = {
    targetID: 'twitch-embed',
    width: '940',
    height: '480',
};


export default TwitchPlayer;