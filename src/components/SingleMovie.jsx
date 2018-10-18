import React, {Component} from 'react';
import '../interface/style/singleMovie.css';
import MyPlayer from './MyPlayer';
import Comments from './Comments.jsx';
import axios from 'axios';
import Trailer from "./Trailer";

class SingleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: '',
            title: '',
            year: '',
            length: '',
            imdb: '',
            summmary: '',
            genres: [],
            quality: null,
            trailerUrl: null

        }
    }

    changeQuality(resolution) {
        this.setState({
            quality: resolution
        });
            document.getElementById('1080').disabled = "disabled";
            document.getElementById('720').disabled = "disabled";
    }

    componentDidMount() {
        axios.get('http://localhost:3001/youtube/' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    trailerUrl: response.data.url
                })
            });
        axios.get('https://yts.am/api/v2/movie_details.json?movie_id=' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    poster: response.data.data.movie.medium_cover_image,
                    title: response.data.data.movie.title_english,
                    year: response.data.data.movie.year,
                    length: response.data.data.movie.runtime,
                    imdb: response.data.data.movie.rating,
                    summmary: response.data.data.movie.description_full,
                    genres: response.data.data.movie.genres
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <section className="single-movie-container">
                <div className="description">
                    <h1 className="title">
                        {this.state.title}
                    </h1>
                    <div className="poster">
                        <img src={[this.state.poster]} alt={this.state.title}/>
                    </div>
                    <div className="description-txt">
                        <div className="row">
                            <div className="characteristic">
                                Year:
                            </div>
                            <div className="txt">
                                {this.state.year}
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                Length:
                            </div>
                            <div className="txt">
                                {this.state.length}
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                IMDb grade:
                            </div>
                            <div className="txt">
                                {this.state.imdb}
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                Genre
                            </div>
                            <div className="txt">
                                {this.state.genres.join(", ")}
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                Summary:
                            </div>
                            <div className="txt">
                                {this.state.summmary}
                            </div>
                            <div className="characteristic">
                                Quality:
                            </div>
                            <input id="720" type="submit" onClick={() => this.changeQuality(720)} value="720p"/>
                            <input id="1080" type="submit" onClick={() => this.changeQuality(1080)} value="1080p"/>
                        </div>
                    </div>
                </div>
                {this.state.quality ? <MyPlayer id={this.props.match.params.id} quality={this.state.quality}/> :
                    <Trailer id={this.props.match.params.id} url={this.state.trailerUrl}/>}
                <Comments/>
            </section>
        );
    }
}

export default SingleMovie;
