import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';

class MyPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resolution: this.props.quality,
            imdbExist: this.props.id !== ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            resolution: nextProps.quality
        });
        if (this.state.imdbExist) {
            axios.post('http://localhost:8000/api/films/create-films', {
                id_film: this.props.id + "." + nextProps.quality + ".mp4"
            });
        }
        return nextProps.quality;
    }
    
    componentDidMount() {
        if (!this.state.imdbExist) {
            const msg = this.props.componentState.intl.locale === "en" ? 'This video currently unavailable' : 'Это видео в настоящее время недоступно';
            toast.warn(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    render() {
        return (
            <div>
                <ToastContainer autoClose={5000} position="top-center" hideProgressBar={true}/>
                {this.state.imdbExist &&
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
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

export default connect(mapStateToProps, null)(MyPlayer);
