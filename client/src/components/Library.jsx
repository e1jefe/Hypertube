import React, { Component } from 'react';
import '../interface/style/library.css';
import { Dropdown } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
class Library extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {
                min: 1980,
                max: 2015,
            },
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
                { key: 'usa', value: 'usa', flag: 'us', text: 'USA' },
                { key: 'gb', value: 'gb', flag: 'gb', text: 'Britain' },
                { key: 'fr', value: 'fr', flag: 'fr', text: 'France' }
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
                },{
                    key: '5',
                    value: '5',
                    text: '5+'
                },{
                    key: '6',
                    value: '6',
                    text: '6+'
                },{
                    key: '7',
                    value: '7',
                    text: '7+'
                },{
                    key: '8',
                    value: '8',
                    text: '8+'
                },{
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
            movies: [
                {
                    poster: 'https://i.pinimg.com/originals/e4/23/0f/e4230f081dcb9c969c19d6a9bf2647f3.jpg',
                    country: "USA",
                    year: 1992,
                    id: 9122998,
                    name: "Colombo",
                    genre: ["comedy", "action", "detective"]
                },
                {
                    poster: 'https://m.media-amazon.com/images/M/MV5BMjAyNDEyMzc4Ml5BMl5BanBnXkFtZTgwMjEzNjM0NTM@._V1_.jpg',
                    country: "USA",
                    year: 2018,
                    id: 91229977,
                    name: "Ocean's 8",
                    genre: ["comedy", "action", "thriller"]
                },
                {
                    poster: 'https://i.pinimg.com/originals/5d/35/06/5d3506d54587120f531e61db0c106005.jpg',
                    country: "USA",
                    year: 2002,
                    id: 1122966,
                    name: "Catch me if you can",
                    genre: ["comedy", "action"]
                },
                {
                    poster: 'http://cdn.collider.com/wp-content/uploads/2018/05/mission-impossible-6-poster.jpg',
                    country: "USA",
                    year: 2018,
                    id: 11229055,
                    name: "Mission impossible",
                    genre: ["comedy", "action"]
                },
                {
                    poster: 'https://movieposters2.com/images/634831-b.jpg',
                    country: "USA",
                    year: 2006,
                    id: 10229944,
                    name: "Prestige",
                    genre: ["drama", "action"]
                },
                {
                    poster: 'https://i.pinimg.com/originals/e4/23/0f/e4230f081dcb9c969c19d6a9bf2647f3.jpg',
                    country: "USA",
                    year: 1992,
                    id: 11209988,
                    name: "Colombo",
                    genre: ["comedy", "action", "detective"]
                },
                {
                    poster: 'https://m.media-amazon.com/images/M/MV5BMjAyNDEyMzc4Ml5BMl5BanBnXkFtZTgwMjEzNjM0NTM@._V1_.jpg',
                    country: "USA",
                    year: 2018,
                    id: 11229970,
                    name: "Ocean's 8",
                    genre: ["comedy", "action", "thriller"]
                },
                {
                    poster: 'https://i.pinimg.com/originals/5d/35/06/5d3506d54587120f531e61db0c106005.jpg',
                    country: "USA",
                    year: 2002,
                    id: 11229969,
                    name: "Catch me if you can",
                    genre: ["comedy", "action"]
                },
                {
                    poster: 'http://cdn.collider.com/wp-content/uploads/2018/05/mission-impossible-6-poster.jpg',
                    country: "USA",
                    year: 2018,
                    id: 13229955,
                    name: "Mission impossible",
                    genre: ["comedy", "action"]
                },
                {
                    poster: 'https://movieposters2.com/images/634831-b.jpg',
                    country: "USA",
                    year: 2006,
                    id: 15229944,
                    name: "Prestige",
                    genre: ["drama", "action"]
                },
                {
                    poster: 'https://i.pinimg.com/originals/e4/23/0f/e4230f081dcb9c969c19d6a9bf2647f3.jpg',
                    country: "USA",
                    year: 1992,
                    id: 11229948,
                    name: "Colombo",
                    genre: ["comedy", "action", "detective"]
                },
                {
                    poster: 'https://m.media-amazon.com/images/M/MV5BMjAyNDEyMzc4Ml5BMl5BanBnXkFtZTgwMjEzNjM0NTM@._V1_.jpg',
                    country: "USA",
                    year: 2018,
                    id: 11429977,
                    name: "Ocean's 8",
                    genre: ["comedy", "action", "thriller"]
                },
                {
                    poster: 'https://i.pinimg.com/originals/5d/35/06/5d3506d54587120f531e61db0c106005.jpg',
                    country: "USA",
                    year: 2002,
                    id: 11226966,
                    name: "Catch me if you can",
                    genre: ["comedy", "action"]
                },
                {
                    poster: 'http://cdn.collider.com/wp-content/uploads/2018/05/mission-impossible-6-poster.jpg',
                    country: "USA",
                    year: 2018,
                    id: 11229975,
                    name: "Mission impossible",
                    genre: ["comedy", "action"]
                },
                {
                    poster: 'https://movieposters2.com/images/634831-b.jpg',
                    country: "USA",
                    year: 2006,
                    id: 11729944,
                    name: "Prestige",
                    genre: ["drama", "action"]
                },
                {
                    poster: 'https://i.pinimg.com/originals/e4/23/0f/e4230f081dcb9c969c19d6a9bf2647f3.jpg',
                    country: "USA",
                    year: 1992,
                    id: 11259988,
                    name: "Colombo",
                    genre: ["comedy", "action", "detective"]
                },
                {
                    poster: 'https://m.media-amazon.com/images/M/MV5BMjAyNDEyMzc4Ml5BMl5BanBnXkFtZTgwMjEzNjM0NTM@._V1_.jpg',
                    country: "USA",
                    year: 2018,
                    id: 11229577,
                    name: "Ocean's 8",
                    genre: ["comedy", "action", "thriller"]
                },
                {
                    poster: 'https://i.pinimg.com/originals/5d/35/06/5d3506d54587120f531e61db0c106005.jpg',
                    country: "USA",
                    year: 2002,
                    id: 11229926,
                    name: "Catch me if you can",
                    genre: ["comedy", "action"]
                },
                {
                    poster: 'http://cdn.collider.com/wp-content/uploads/2018/05/mission-impossible-6-poster.jpg',
                    country: "USA",
                    year: 2018,
                    id: 12229955,
                    name: "Mission impossible",
                    genre: ["comedy", "action"]
                },
                {
                    poster: 'https://movieposters2.com/images/634831-b.jpg',
                    country: "USA",
                    year: 2006,
                    id: 11223944,
                    name: "Prestige",
                    genre: ["drama", "action"]
                }
            ]
        };
        this.changeYearRange = this.changeYearRange.bind(this);
    }

    changeYearRange(val) {
        this.setState({
            value: val
        });
    }

    render() {
        return (
            <div className="library-container">
                <h1>
                    Library
                </h1>
                <div className="control need-space">
                    <div className="search-input">
                        <label>
                            <i className="fas fa-search"></i>
                        </label>
                        <input type="text" placeholder="Search"/>
                    </div>
                    <InputRange
                        allowSameValues
                        draggableTrack
                        maxValue={2018}
                        minValue={1910}
                        value={this.state.value}
                        onChange={value => this.changeYearRange(value)} />
                </div>
                <div className="control column">
                    <div className="param">
                        <Dropdown placeholder='COUNTRY' fluid search multiple selection options={this.state.country} />
                    </div>
                    <div className="param">                    
                        <Dropdown placeholder='IMDB RATING' fluid search selection options={this.state.imdb} />
                    </div>
                    <div className="param">                    
                        <Dropdown placeholder='GENRE' fluid search multiple selection options={this.state.genre} />
                    </div>
                    <div className="param">                    
                        <Dropdown placeholder='SORT BY' fluid selection options={this.state.sortParam} />
                    </div>
                </div>
                <div className="movies-all">
                    {
                        this.state.movies.map((mov) => {
                            return(
                                <div className="movie-item" key={mov.id}>
                                    <div className="poster">
                                        <img src={mov.poster} alt={mov.name}/>
                                        <a href={"/movie/" + mov.id}>
                                            <p>
                                                <i className="fas fa-play"></i>
                                            </p>
                                        </a>
                                    </div>
                                    <div className="production">
                                        <p className="year">
                                            {mov.year}
                                        </p>
                                        <p className="country">
                                            {mov.country}
                                        </p>
                                    </div>
                                    <div className="title">
                                        <a href={"/movie/" + mov.id}>
                                            {mov.name}
                                        </a>
                                    </div>
                                    <div className="genre">
                                        {mov.genre.join(", ")}
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
