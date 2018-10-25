import React, {Component} from 'react';

class Trailer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trailer: this.props.url
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            trailer: nextProps.url
        });
        return nextProps.url
    }

    render() {
        return (
            <div className="player">
                <iframe id="ytplayer"
                        type="text/html"
                        autoPlay="1"
                        width="100%"
                        height="100%"
                        allowFullScreen
                        title="This is a unique title"
                        src={["http://www.youtube.com/embed/" + this.state.trailer + '?autoplay=1&mute=1']}/>
            </div>
        )
    }

}

export default Trailer;