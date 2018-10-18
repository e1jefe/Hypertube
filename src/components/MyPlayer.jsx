import React, {Component} from 'react';
import ReactPlayer from 'react-player';

class MyPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resolution: this.props.quality
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            resolution: nextProps.quality
        });
        return nextProps.quality
    }

    render() {
        return (
            <div className="player">
                <ReactPlayer
                    playing={true}
                    controls={true}
                    width='100%'
                    height='100%'
                    onReady={() => {
                        if (this.state.resolution === 720) {
                            document.getElementById('1080').disabled = false;
                        }
                        else {
                            document.getElementById('720').disabled = false;
                        }
                    }}
                    url={['http://localhost:3001/movie/' + this.props.id + '/' + this.state.resolution]}
                    config={{
                        file: {
                            tracks: [
                                {kind: 'subtitles', src: '/subtitles/en/' + this.props.id, srcLang: 'en'},
                                {kind: 'subtitles', src: '/subtitles/ru/' + this.props.id, srcLang: 'ru'}
                            ]
                        }
                    }}
                >
                </ReactPlayer>
            </div>
        )
    }

}

export default MyPlayer;