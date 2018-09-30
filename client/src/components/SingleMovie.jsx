import React, { Component } from 'react';
import '../interface/style/singleMovie.css';
import MyPlayer from './MyPlayer';
import Comments from './Comments';

class SingleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: "",
            error: ""
        };
    }

    componentDidMount() {
        this.setState({
            movieId: this.props.match.params
        })
    }

    render() {
        console.log("history", this.state.movieId)
        return (
            <section className="single-movie-container">
                <div className="description">
                    <h1 className="title">
                        The Hitchhiker's Guide to the Galaxy
                    </h1>
                    <div className="poster">
                        <img src="https://m.media-amazon.com/images/M/MV5BZmU5MGU4MjctNjA2OC00N2FhLWFhNWQtMzQyMGI2ZmQ0Y2YyL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg" alt="The Hitchhiker's Guide to the Galaxy"/>
                    </div>
                    <div className="description-txt">
                        <div className="row">
                            <div className="characteristic">
                                Year:
                            </div>
                            <div className="txt">
                                2005
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                Length:
                            </div>
                            <div className="txt">
                                180
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                IMDb grade:
                            </div>
                            <div className="txt">
                                6.8
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                Director
                            </div>
                            <div className="txt">
                                Garth Jennings
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                Stars:
                            </div>
                            <div className="txt">
                                Martin Freeman, Yasiin Bey, Sam Rockwell
                            </div>
                        </div>
                        <div className="row">
                            <div className="characteristic">
                                Summary:
                            </div>
                            <div className="txt">
                                Mere seconds before the Earth is to be demolished by an alien construction crew, journeyman Arthur Dent is swept off the planet by his friend Ford Prefect, a researcher penning a new edition of "The Hitchhiker's Guide to the Galaxy."
                            </div>
                        </div>
                    </div>
                </div>
                <MyPlayer/>
                <Comments/>
            </section>
        );
    }
}

export default SingleMovie;
