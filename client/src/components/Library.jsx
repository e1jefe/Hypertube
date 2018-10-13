import React, { Component } from 'react';
import '../interface/style/library.css';
import { Dropdown } from 'semantic-ui-react';
// import InputRange from 'react-input-range';
import Slider from 'rc-slider';
import "react-input-range/lib/css/index.css";
import 'rc-slider/assets/index.css';
import axios from 'axios';

const Range = Slider.createSliderWithTooltip(Slider.Range);

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
                    value: 'romance',
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
                    key: 'sci-fi',
                    value: 'sci-fi',
                    text: 'Sci-Fi'
                },
                {
                    key: 'horror',
                    value: 'horror',
                    text: 'Horror'
                },
                {
                    key: 'thriller',
                    value: 'thriller',
                    text: 'Thriller'
                },
                {
                    key: 'drama',
                    value: 'drama',
                    text: 'Drama'
                },
                {
                    key: 'animation',
                    value: 'animation',
                    text: 'Animation'
                },
                {
                    key: 'mystery',
                    value: 'mystery',
                    text: 'Mystery'
                },
                {
                    key: 'fantasy',
                    value: 'fantasy',
                    text: 'Fantasy'
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
            movies: [],
            hasMoreItems: true,
            isLoading: false,
            currentSortParam: "title",
            order: "asc",
            imdbMin: "",
            currentGenre: "",
            pageStart: 0,
            error: ""
        };
        // this.loadItems = this.loadItems.bind(this);
        this.changeYearRange = this.changeYearRange.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.changeRate = this.changeRate.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        window.onscroll = () => {
            const {
                loadItems,
                state: {
                    isLoading,
                    hasMore
                },
            } = this;
      
            if ( isLoading || !hasMore) return;

            // Checks that the page has scrolled to the bottom
            if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight ) {
                loadItems();
            }
          };
    }

    componentDidMount() {
        console.log("component did mount");
        const page = this.state.pageStart + 1;
        this.loadItems();
        this.setState({
            pageStart: page
        });
    }

    changeYearRange(val) {
        //get value as array of ints [min, max]
        // this.setState({
        //     value: val
        // });
    }

    changeRate(val, data) {
        if (data.value !== "any") {
            this.setState({
                imdbMin: data.value,
                pageStart: 1,
                movies: []
            }, () => this.loadItems());
        }
        
    }

    changeGenre(event, data) {
        console.log("val", data);
    }

    changeSort(event, data){
        console.log("got new sort", data);
        if (data.value === 'pop') {
            this.setState({
                currentSortParam: "rating",
                order: "desc",
                movies: [],
                pageStart: 1
            }, () => this.loadItems());
        } else {
            this.setState({
                currentSortParam: "title",
                order: "asc",
                movies: [],
                pageStart: 1
            }, () => this.loadItems());
        }
    }

    loadItems = () => {
        console.log("movie at beggining", this.state.movies);

        const baseUrl = "https://yts.am/api/v2/list_movies.json?";
        const page = 'page=' + this.state.pageStart;
        const sortParam = "&sort_by=" + this.state.currentSortParam;
        const orderParam = "&order_by=" + this.state.order;
        const rate = this.state.imdbMin !== "" ? "&minimum_rating=" + this.state.imdbMin : "";
        const genre = this.state.currentGenre !== "" ? "&genre=" + this.state.currentGenre : "";
        let requestUrl = baseUrl + page + rate + sortParam + orderParam;
        console.log("request", requestUrl);

        this.setState({ isLoading: true }, () => {
            axios
              .get(requestUrl)
              .then((response) => {          
                // Creates a massaged array of user data
                const nextMovies = response.data.data.movies.map(mov => ({
                    poster: mov.large_cover_image,
                    country: mov.language,
                    year: mov.year,
                    id: mov.id,
                    name: mov.title_english,
                    genre: mov.genres
                }));
                let newPage = this.state.pageStart + 1;
                // Merges the next users into our existing users
                this.setState({
                  // Note: Depending on the API you're using, this value may be
                  // returned as part of the payload to indicate that there is no
                  // additional data to be loaded
                  hasMore: (this.state.movies.length < response.data.data.movie_count),
                  isLoading: false,
                  movies: [
                    ...this.state.movies,
                    ...nextMovies,
                  ],
                  pageStart: newPage
                });
              })
              .catch((err) => {
                this.setState({
                  error: err.message,
                  isLoading: false,
                 });
              })
          });
        // console.log("page", page);
        // var self = this;
        // let pageStart = this.state.pageStart;
        // axios.get('https://yts.am/api/v2/list_movies.json?page=' + page + "&sort_by=" + this.state.currentSortParam + "&order_by=" + this.state.order)
        //     .then(function (response) {
        //         // handle success
        //         if (response.data.data.movies !== undefined) {
        //             let movies = self.state.movies;
        //             response.data.data.movies.map((mov) => {
        //                 movies.push({
        //                     poster: mov.large_cover_image,
        //                     country: mov.language,
        //                     year: mov.year,
        //                     id: mov.id,
        //                     name: mov.title_english,
        //                     genre: mov.genres
        //                 })
        //             })
        //             self.setState({
        //                 movies: movies,
        //                 pageStart: pageStart + 1
        //             })
        //         } else {
        //             this.setState({
        //                 hasMoreItems: false
        //             })
        //         }
        //       })
        //       .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //       })
    }

    render() {
        const marks = {
            1910: '1910',
            2018: '2018'
        };

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
                    <div style={{width: "200px", height: "50px"}}>
                        <Range min={1910} max={2018} defaultValue={[1990, 2010]} marks={marks} onAfterChange={(event) => this.changeYearRange(event)}/>
                    </div>
                </div>
                <div className="control column">
                    {/* <div className="param">
                        <Dropdown placeholder='COUNTRY' fluid search multiple selection options={this.state.country} />
                    </div> */}
                    <div className="param">                    
                        <Dropdown placeholder='IMDB RATING' fluid search selection options={this.state.imdb} onChange={this.changeRate}/>
                    </div>
                    <div className="param">                    
                        <Dropdown placeholder='GENRE' fluid search multiple selection options={this.state.genre} onChange={this.changeGenre}/>
                    </div>
                    <div className="param">                    
                        <Dropdown placeholder='SORT BY' fluid selection options={this.state.sortParam} onChange={this.changeSort}/>
                    </div>
                </div>
                <div className="movies-all container">
                    <div className="row">
                    {
                        this.state.movies.map((mov) => {
                            return(
                                <div className="movie-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12" key={mov.id}>
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
                                        {mov.genre !== undefined ? mov.genre.join(", ") : " "}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {this.state.isLoading &&
                        <div>Loading...</div>
                    }
                    </div>
                </div>
            </div>);
    }
}

export default Library;
