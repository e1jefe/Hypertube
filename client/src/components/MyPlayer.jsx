import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import axios from "axios";

class MyPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        axios.get('https://yts.am/api/v2/list_movies.json')
            .then((response) => {
                console.log("responce", response.data.data)
            });
    }

    render() {
        return(
            <div className="player">
                <Video autoPlay loop muted
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                    poster={this.props.poster}
                    >
                    <source src="http://sourcefile.webm" type="video/webm" />
                    <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
                </Video>
            </div>
        )
    }

}

export default MyPlayer;
