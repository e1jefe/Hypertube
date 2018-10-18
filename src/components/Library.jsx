import React, {Component} from 'react';
import '../interface/style/library.css';
import {Dropdown} from 'semantic-ui-react';
import axios from "axios";

class Library extends Component {

    constructor(props) {
        super(props);
        this.state = {
            years: [
                {
                    key: '1990',
                    value: '1990',
                    text: '1990'
                },
                {
                    key: '1991',
                    value: '1991',
                    text: '1991'
                },
                {
                    key: '1992',
                    value: '1992',
                    text: '1992'
                }
            ],
            country: [
                {key: 'usa', value: 'usa', flag: 'us', text: 'USA'},
                {key: 'gb', value: 'gb', flag: 'gb', text: 'Britain'},
                {key: 'fr', value: 'fr', flag: 'fr', text: 'France'}
            ],
            imdb: [
                {
                    key: 'any',
                    value: 'any',
                    text: 'any'
                },
                {
                    key: '1',
                    value: '1',
                    text: '1+'
                },
                {
                    key: '2',
                    value: '2',
                    text: '2+'
                },
                {
                    key: '3',
                    value: '3',
                    text: '3+'
                },
                {
                    key: '4',
                    value: '4',
                    text: '4+'
                }, {
                    key: '5',
                    value: '5',
                    text: '5+'
                }, {
                    key: '6',
                    value: '6',
                    text: '6+'
                }, {
                    key: '7',
                    value: '7',
                    text: '7+'
                }, {
                    key: '8',
                    value: '8',
                    text: '8+'
                }, {
                    key: '9',
                    value: '9',
                    text: '9+'
                }
            ],
            genre: [
                {
                    key: 'love',
                    value: 'love',
                    text: 'Romance'
                },
                {
                    key: 'comedy',
                    value: 'comedy',
                    text: 'Comedy'
                },
                {
                    key: 'action',
                    value: 'action',
                    text: 'Action'
                },
                {
                    key: 'detective',
                    value: 'detective',
                    text: 'Detective'
                },
                {
                    key: 'horror',
                    value: 'horror',
                    text: 'Horror'
                }
            ],
            sortParam: [
                {
                    key: 'pop',
                    value: 'pop',
                    text: 'Popularity'
                },
                {
                    key: 'name',
                    value: 'name',
                    text: 'Name'
                }
            ],
            movies: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001')
            .then((response) => {
                this.setState({
                    movies:response.data
                });
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="library-container">
                <h1>
                    Library
                </h1>
                <div className="control">
                    <Dropdown placeholder='YEAR' fluid search multiple selection options={this.state.years}/>
                    <Dropdown placeholder='COUNTRY' fluid search multiple selection options={this.state.country}/>
                    <Dropdown placeholder='IMDB RATING' fluid search selection options={this.state.imdb}/>
                    <Dropdown placeholder='GENRE' fluid search multiple selection options={this.state.genre}/>
                    <Dropdown placeholder='SORT BY' fluid selection options={this.state.sortParam}/>
                </div>
                <div className="movies-all">
                    {
                        this.state.movies.map((mov) => {
                            return (
                                <div className="movie-item" key={mov.id}>
                                    <div className="poster">
                                        <img src={mov.src} alt={mov.name}/>
                                        <a href={mov.href}>
                                            <p>
                                                <i className="fas fa-play"></i>
                                            </p>
                                        </a>
                                    </div>
                                    <div className="production">
                                        <p className="year">
                                            {mov.year}
                                        </p>
                                    </div>
                                    <div className="title">
                                        <a href={mov.href}>
                                            {mov.name}
                                        </a>
                                    </div>
                                    <div className="genre">
                                        {mov.genres.join(", ")}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>);
    }
}

export default Library;
