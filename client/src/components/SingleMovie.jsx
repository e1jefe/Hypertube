import React, { Component } from 'react';
import '../interface/style/singleMovie.css';
import MyPlayer from './MyPlayer';
import Comments from './Comments.jsx';
import axios from 'axios';


class SingleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: "",
            error: "",
            data: {}
        };
    }

    componentDidMount() {
        let self = this;
        // this.setState({
        //     movieId: this.props.match.params
        // })
        console.log("id", this.props.match.params.id);
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
        console.log("state", this.state);
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
                                Year:
                            </div>
                            <div className="txt">
                                {this.state.data.year}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                Length:
                            </div>
                            <div className="txt">
                                {this.state.data.runtime}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                IMDb grade:
                            </div>
                            <div className="txt">
                                {this.state.data.rating} 
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                Country:
                            </div>
                            <div className="txt">
                                {this.state.data.country}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                Director:
                            </div>
                            <div className="txt">
                                {this.state.data.director}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                Stars:
                            </div>
                            <div className="txt">
                                {this.state.data.actors}
                            </div>
                        </div>
                        <div className="my-row">
                            <div className="characteristic">
                                Summary:
                            </div>
                            <div className="txt">
                                {this.state.data.plot}
                            </div>
                        </div>
                    </div>
                </div>
                <MyPlayer poster={this.state.data.poster} />
                <Comments/>
            </section>
        );
    }
}

export default SingleMovie;
