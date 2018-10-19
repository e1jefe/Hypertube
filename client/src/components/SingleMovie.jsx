import React, { Component } from 'react';
import '../interface/style/singleMovie.css';
import MyPlayer from './MyPlayer';
import Comments from './Comments.jsx';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import Trailer from "./Trailer";
import { Button } from 'semantic-ui-react';

class SingleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: "",
            error: "",
            data: {},
            quality: null,
            trailerUrl: null
        };
    }

    changeQuality(resolution) {
        this.setState({
            quality: resolution
        });
            document.getElementById('1080').disabled = "disabled";
            document.getElementById('720').disabled = "disabled";
    }

    componentDidMount() {
        let self = this;
        // axios.get('http://localhost:3001/youtube/' + this.props.match.params.id)
        //     .then((response) => {
        //         this.setState({
        //             trailerUrl: response.data.url
        //         })
        //     });
        axios.get('https://yts.am/api/v2/movie_details.json?movie_id=' + this.props.match.params.id)
            .then(function (response) {

                // handle success
                if (response.data.data.movie !== undefined) {
                    let imdb = response.data.data.movie.imdb_code;
                    axios.get('http://www.omdbapi.com/?i=' + imdb + "&apikey=1b966a3b").then((res) => {
                        self.setState({
                            data: {
                                title: response.data.data.movie.title_english,
                                year: response.data.data.movie.year,
                                runtime: response.data.data.movie.runtime,
                                rating: response.data.data.movie.rating,
                                plot: response.data.data.movie.description_full,
                                poster: response.data.data.movie.large_cover_image,
                                director: res.data.Director,
                                actors: res.data.Actors,
                                country: res.data.Country
                            }
                        })
                    });
                }
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
    }

    render() {
        // console.log("history", this.state.movieId)
        // console.log("state", this.state);
        return (
            <section className="single-movie-container">
                <div className="description">
                    <h1 className="title">
                        {this.state.data.title}
                    </h1>
                    <div className="poster">
                        <img src={this.state.data.poster} alt="The Hitchhiker's Guide to the Galaxy"/>
                    </div>
                    <div className="description-txt">
                        <div className="my-row">
                            <div className="characteristic">
                                <FormattedMessage id="movie.year" defaultMessage="Year: " />
                            </div>
                            <div className="txt">
                                {this.state.data.year}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                <FormattedMessage id="movie.length" defaultMessage="Length: " />
                            </div>
                            <div className="txt">
                                {this.state.data.runtime}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                <FormattedMessage id="movie.imdb" defaultMessage="IMDb grade: " />
                                
                            </div>
                            <div className="txt">
                                {this.state.data.rating} 
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                <FormattedMessage id="movie.country" defaultMessage="Country: " />
                            </div>
                            <div className="txt">
                                {this.state.data.country}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                <FormattedMessage id="movie.director" defaultMessage="Director: " />
                            </div>
                            <div className="txt">
                                {this.state.data.director}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                <FormattedMessage id="movie.stars" defaultMessage="Stars: " />
                            </div>
                            <div className="txt">
                                {this.state.data.actors}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                <FormattedMessage id="movie.summary" defaultMessage="Summary: " />
                            </div>
                            <div className="txt">
                                {this.state.data.plot}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                Quality:
                            </div>
                            <Button color='purple' id="720" onClick={() => this.changeQuality(720)}>720p</Button>
                            <Button color='purple' id="1080" onClick={() => this.changeQuality(1080)}>1080p</Button>
                        </div>
                    </div>
                </div>
                {
                    this.state.quality ? 
                        <MyPlayer id={this.props.match.params.id} quality={this.state.quality}/> 
                        :
                        this.state.trailerUrl !== null ?
                            <Trailer id={this.props.match.params.id} url={this.state.trailerUrl}/>
                            :
                            null
                }
                <Comments/>
            </section>
        );
    }
}

export default SingleMovie;
