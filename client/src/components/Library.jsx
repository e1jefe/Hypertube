import React, { Component } from 'react';
import '../interface/style/library.css';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Library extends Component {

    constructor(props) {
        super(props);
        this.state = {
            yearGap: {
                min: 1910,
                max: 2018
            },
            prevYearGap: {
                min: 1910,
                max: 2018
            },
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
            imdbRU: [
                {
                    key: 'any',
                    value: 'any',
                    text: 'Любой'
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
                    key: 'animation',
                    value: 'animation',
                    text: 'Animation'
                },
                {
                    key: 'action',
                    value: 'action',
                    text: 'Action'
                },
                {
                    key: 'comedy',
                    value: 'comedy',
                    text: 'Comedy'
                },
                {
                    key: 'drama',
                    value: 'drama',
                    text: 'Drama'
                },
                {
                    key: 'fantasy',
                    value: 'fantasy',
                    text: 'Fantasy'
                },
                {
                    key: 'horror',
                    value: 'horror',
                    text: 'Horror'
                },
                {
                    key: 'love',
                    value: 'romance',
                    text: 'Romance'
                },
                {
                    key: 'mystery',
                    value: 'mystery',
                    text: 'Mystery'
                },   
                {
                    key: 'thriller',
                    value: 'thriller',
                    text: 'Thriller'
                }
            ],
            sortParam: [
                {
                    key: 'name',
                    value: 'name',
                    text: 'Name'
                },
                {
                    key: 'pop',
                    value: 'pop',
                    text: 'Popularity'
                },
                {
                    key: 'year',
                    value: 'year',
                    text: 'Year'
                }
            ],
            sortParamRU: [
                {
                    key: 'name',
                    value: 'name',
                    text: 'По названию'
                },
                {
                    key: 'year',
                    value: 'year',
                    text: 'По год'
                },
                {
                    key: 'pop',
                    value: 'pop',
                    text: 'По популярности'
                }
            ],
            movies: [],
            hasMore: true,
            isLoading: false,
            currentSortParam: "rating",
            order: "desc",
            imdbMin: "",
            currentGenre: "all",
            pageStart: 1,
            error: "",
            movieTitle: "",
            rememberPrevRes: 0
        };
        this.changeSort = this.changeSort.bind(this);
        this.changeRate = this.changeRate.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.sendGenre = this.sendGenre.bind(this);
        this.recordSearchTitle = this.recordSearchTitle.bind(this);
        this.sendMovTitle = this.sendMovTitle.bind(this);
        this.sendYear = this.sendYear.bind(this);
        this.changeMinYear = this.changeMinYear.bind(this);
        this.changeMaxYear = this.changeMaxYear.bind(this);
        this.pushMovie = this.pushMovie.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token === null) {
            this.props.history.push('/signin');
        } else {
            window.addEventListener('scroll', this.handleScroll);
            fetch('http://127.0.0.1:8000/api/cabinet/all-watched-films', {
                    method: 'POST',
                    headers:{
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    this.setState({
                        watchedFilms: res
                    });
                });
            // this.loadItems();
        }
    }

    handleScroll() {
        if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight ) {
            this.loadItems();
        }
    }

    changeMinYear(e, data) {
        let yearGap = this.state.yearGap;
        if (data.value.match("[0-9]+") !== null) {
            if (data.value.length < 5) {
                yearGap.min = data.value.match("[0-9]+")[0];
            } else {
                yearGap.min = yearGap.min
            }
        } else {
            yearGap.min = "";
        }
        this.setState({
            yearGap
        });
    }

    changeMaxYear(e, data) {
        let yearGap = this.state.yearGap;
        if (data.value.match("[0-9]+") !== null) {
            yearGap.max = data.value.length < 5 ? data.value.match("[0-9]+")[0] : yearGap.max;
        } else {
            yearGap.max = "";
        }
        this.setState({
            yearGap
        })
    }

    sendYear(){
        let yearGap = this.state.yearGap;
        if (this.state.yearGap.min === "" && this.state.yearGap.max === "") {
            yearGap = {
                min: 1910,
                max: 2018
            }
        } else if (this.state.yearGap.min === "" || this.state.yearGap.max === "") {
            yearGap.min = this.state.yearGap.min === "" ? this.state.yearGap.max : this.state.yearGap.min;
            yearGap.max = this.state.yearGap.max === "" ? this.state.yearGap.min : this.state.yearGap.max;
        }

        if (parseInt(yearGap.min, 10) < 1910 || parseInt(yearGap.min, 10) > 2018) {
            yearGap.min = 1910;
            const msg = this.props.componentState.intl.locale === "en" ? 'Invalid year from' : 'Некорректный минимальный год';
            toast.error(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

        if (parseInt(yearGap.max, 10) < 1910 || parseInt(yearGap.max, 10) > 2018) {
            yearGap.max = 2018;
            const msg = this.props.componentState.intl.locale === "en" ? 'Invalid maximum year production' : 'Некорректный максимальный год';
            toast.error(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

        if (parseInt(yearGap.min, 10) > parseInt(yearGap.max, 10) || parseInt(yearGap.max, 10) < parseInt(yearGap.min, 10)) {
            const tmpMin = yearGap.min;
            yearGap.min = yearGap.max;
            yearGap.max = tmpMin;
        }
        console.log("send", this.state.yearGap)
        console.log("prev", this.state.prevYearGap)

        console.log("compare", JSON.stringify(this.state.yearGap) !== JSON.stringify(this.state.prevYearGap))

        if (JSON.stringify(this.state.yearGap) !== JSON.stringify(this.state.prevYearGap)) {
            this.setState({
                // pageStart: 1,
                // movies: [],
                // currentSortParam: "title",
                // order: "asc",
                // yearGap: yearGap,
                // hasMore: true,
                // prevYearGap: JSON.parse(JSON.stringify(yearGap))
            });
        } 
        // else {
        //     this.setState({
        //         yearGap: yearGap,
        //         prevYearGap: JSON.parse(JSON.stringify(yearGap))
        //     })
        // }
    }

    changeRate(event, data) {
        // if (data.value !== this.state.imdbMin) {
        //     this.setState({
        //         currentSortParam: "title",
        //         order: "asc",
        //         imdbMin: data.value,
        //         pageStart: 1,
        //         movies: [],
        //         hasMore: true
        //     });
        // }
    }

    changeGenre(event, data) {
        const currentLength = this.state.currentGenre.length;
        this.setState({
            currentGenre: data.value,
        })
        if (currentLength > data.value.length) {
            // this.sendGenre();
        }
    }

    sendGenre() {
        // this.setState({
        //     currentSortParam: "title",
        //     order: "asc",
        //     movies: [],
        //     pageStart: 1,
        //     hasMore: true
        // });
    }

    changeSort(event, data){
        if (data.value === 'pop') {
            this.setState({
                currentSortParam: "rating",
                order: "desc",
                movies: [],
                pageStart: 1,
                hasMore: true
            }, () => this.loadItems());
        } else if (data.value === 'name'){
            this.setState({
                currentSortParam: "name",
                order: "asc",
                movies: [],
                pageStart: 1,
                hasMore: true
            }, () => this.loadItems());
        } else if (data.value === 'year'){
            this.setState({
                currentSortParam: "year",
                order: "asc",
                movies: [],
                pageStart: 1,
                hasMore: true
            }, () => this.loadItems());
        }
    }

    loadItems = () => {
        console.log("call load ");
        // console.log("has More ", this.state.hasMore);

        if (this.state.hasMore) {
            // const baseUrl = "https://yts.am/api/v2/list_movies.json?";
            // const page = 'page=' + this.state.pageStart;
            // const sortParam = "&sort_by=" + this.state.currentSortParam;
            // const orderParam = "&order_by=" + this.state.order;
            // const rate = this.state.imdbMin !== "" ? "&minimum_rating=" + this.state.imdbMin : "";
            // let allGenres = "";
            // if (this.state.currentGenre.length !== 0) {
            //     this.state.currentGenre.forEach((genre) => {
            //         allGenres = allGenres.concat("&genre=" + genre);
            //     })
            // }
            // let requestUrl = baseUrl + page + rate + sortParam + orderParam + allGenres + title;
            let yearGap = this.state.yearGap;
            if (this.state.yearGap.min === "" && this.state.yearGap.max === "") {
                yearGap = {
                    min: 1910,
                    max: 2018
                }
            } else if (this.state.yearGap.min === "" || this.state.yearGap.max === "") {
                yearGap.min = this.state.yearGap.min === "" ? this.state.yearGap.max : this.state.yearGap.min;
                yearGap.max = this.state.yearGap.max === "" ? this.state.yearGap.min : this.state.yearGap.max;
            }
            const data = {
                lang: this.props.componentState.intl.locale,
                page: this.state.pageStart,
                sort: this.state.currentSortParam,
                order: this.state.order,
                filter: {
                    imdb: this.state.imdbMin,
                    genres: this.state.currentGenre,
                    yearGap: this.state.yearGap
                }
            }
            // console.log("request ", data);

            this.setState({ isLoading: true }, () => {
                fetch('http://localhost:8000/api/library/load-items', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then((res) => res.json())
                    .then((responce) => {   
                        this.setState({
                            isLoading: false,
                            pageStart: data.page + 1,
                            hasMore: parseInt(data.page, 10) < responce.totalPages,
                            movies: [
                                ...this.state.movies,
                                ...responce.data
                            ]
                        })
                        console.log("res", responce);
                    });
            //     axios.get(requestUrl)
            //         .then((response) => {
            // console.log("response ", response);
                        // if (response.data.data.movie_count !== 0 && response.data.data.hasOwnProperty('movies')) {
                        //     let nextMovPack = response.data.data.movies.map((mov) => {
                        //         if (yearGap.min <= mov.year && mov.year <= yearGap.max) {
                        //             return ({
                        //                 poster: mov.large_cover_image !== "" ? mov.large_cover_image : mov.medium_cover_image !== "" ? mov.medium_cover_image : mov.small_cover_image,
                        //                 country: mov.language,
                        //                 year: mov.year,
                        //                 id: mov.id,
                        //                 name: mov.title_english,
                        //                 genre: mov.genres,
                        //                 seen: this.state.watchedFilms.some((item) => item === mov.id)
                        //             })
                        //         } else {
                        //             return false
                        //         }
                        //     });
                        //     let filteredMovies = nextMovPack.filter(function(el) { return el; });
                        //     let newPage = this.state.pageStart + 1;
                        //     // this.state.pageStart * 20 < response.data.data.movie_count
                        //     // console.log("state", this.state);
                        //     // console.log("response", response.data.data);
                        //     // console.log("length", this.state.movies.length);
                        //     // console.log("отфильтровано < 20", filteredMovies.length < 20);
                        //     // console.log("кратно 4", (this.state.movies.length + filteredMovies.length) % 4 !== 0);
                        //     // console.log("новый результат кратно 20", (this.state.movies.length) % 20);
                        //     const prevMovRes = this.state.rememberPrevRes + filteredMovies.length;
                        //     this.setState({
                        //         hasMore: (this.state.movies.length + filteredMovies.length < response.data.data.movie_count),
                        //         isLoading: false,
                        //         movies: [
                        //         ...this.state.movies,
                        //         ...filteredMovies,
                        //         ],
                        //         pageStart: newPage,
                        //         rememberPrevRes: prevMovRes
                        //     });
                        //     // if (filteredMovies.length < 20 && (this.state.movies.length % 4 !== 0)) {
                        //     //     this.loadItems();
                        //     // }
                        //     // console.log("prevMovRes", prevMovRes)

                        //     if (prevMovRes < 20 && this.state.hasMore) {
                        //         // console.log("call more")
                        //         this.loadItems();
                        //     } else {
                        //         this.setState({
                        //             rememberPrevRes: 0
                        //         })
                        //     }
//                         if (response.data.length !== 0) {
//                             let i = -1;
//                             let nextMovPack = response.data.map((mov) => {
//                                 // console.log("tut", mov.images.length);
//                                 if (yearGap.min <= mov.year && mov.year <= yearGap.max) {       
//                                     return ({
//                                         poster: Object.keys(mov.images).length !== 0 ? mov.images.poster : './pics/No_image_poster.png',
//                                         year: mov.year !== null ? mov.year : this.props.componentState.intl.locale === 'en' ? "No info" : "Нет данных",
//                                         id: mov.imdb_id,
//                                         name: mov.title,
//                                         genre: mov.genres.length !== 0 ? mov.genres : this.props.componentState.intl.locale === 'en' ? "No info" : "Нет данных",
//                                         imdb: ''
//                                     })
//                                 } else {
//                                     return false
//                                 }
                                
//                             });
// console.log("filteredMovies", nextMovPack);

                            // let filteredMovies = nextMovPack.filter(function(el) { return el; });
                            // let newPage = this.state.pageStart + 1;
                            // this.state.pageStart * 20 < response.data.data.movie_count
                            // console.log("filteredMovies", filteredMovies);
                            // console.log("response", response.data.data);
                            // console.log("length", this.state.movies.length);
                            // console.log("отфильтровано < 20", filteredMovies.length < 20);
                            // console.log("кратно 4", (this.state.movies.length + filteredMovies.length) % 4 !== 0);
                            // console.log("новый результат кратно 20", (this.state.movies.length) % 20);
                            // const prevMovRes = this.state.rememberPrevRes + filteredMovies.length;
                            // this.setState({
                            //     hasMore: newPage < 182,
                            //     isLoading: false,
                            //     movies: [
                            //     ...this.state.movies,
                            //     ...filteredMovies,
                            //     ],
                            //     pageStart: newPage,
                            //     rememberPrevRes: prevMovRes
                            // });
                            // if (filteredMovies.length < 20 && (this.state.movies.length % 4 !== 0)) {
                            //     this.loadItems();
                            // }
                            // console.log("prevMovRes", prevMovRes)

                    //         if (prevMovRes < 49 && this.state.hasMore) {
                    //             console.log("call more")
                    //             this.loadItems();
                    //         } else {
                    //             this.setState({
                    //                 rememberPrevRes: 0
                    //             })
                    //         }
                    //     } else {
                    //         this.setState({
                    //             hasMore: false,
                    //             isLoading: false
                    //         })
                    //     }
                    // })
                    // .catch((err) => {
                    //     this.setState({
                    //         error: err.message,
                    //         isLoading: false,
                    //         hasMore: false
                    //     });
                    // })
            });
        }
    }

    recordSearchTitle(e){
        this.setState({
            movieTitle: e.target.value
        })
    }

    sendMovTitle(){
        this.setState({
            currentSortParam: "name",
            hasMore: true,
            order: "asc",
            movies: [],
            pageStart: 1,
            currentGenre: "all"
        }, () => this.loadItems());
    }

    pushMovie(e){
        e.preventDefault();
        const movId = e.currentTarget.getAttribute('movnbr');
        this.props.history.push('/movie/' + movId);
    }

    render() {
        // console.log("lib", this.state.movies);

        return (
            <div className="library-container">
                <ToastContainer autoClose={5000} position="top-center" hideProgressBar={true}/>
                <h1>
                    <FormattedMessage id="library.title" defaultMessage="Library" />
                </h1>
                <div className="control need-space">
                    <div className="search-input">
                        <label>
                            <i className="fas fa-search"></i>
                        </label>
                        <input type="text" placeholder={this.props.componentState.intl.locale === 'en' ? "Search" : "Поиск"} onChange={this.recordSearchTitle}/>
                        <Button color='purple' onClick={() => this.sendMovTitle()} disabled={this.state.movieTitle.length === 0}>
                            <Button.Content visible>{this.props.componentState.intl.locale === 'en' ? "Go" : "Вперед"}</Button.Content>
                        </Button>       
                    </div>
                    <div className="year-select">
                        <FormattedMessage id="library.year" defaultMessage="Select year" />
                        <Input className="year-select-input-ru" pattern="[0-9]*" placeholder={this.props.componentState.intl.locale === 'en' ? 'From...' : 'С...'} onChange={this.changeMinYear} style={{margin: "0 5px"}} value={this.state.yearGap.min}/>
                        <Input className="year-select-input-ru" pattern="[0-9]*" placeholder={this.props.componentState.intl.locale === 'en' ? 'To...' : 'По...'} onChange={this.changeMaxYear} value={this.state.yearGap.max}/>
                        <Button  color='purple' onClick={() => this.sendYear()} style={{marginLeft: "5px"}}>
                            <Button.Content visible>{this.props.componentState.intl.locale === 'en' ? "Go" : "Вперед"}</Button.Content>
                        </Button>
                    </div>
                </div>
                <div className="control column">
                    <div className="param">                    
                        <Dropdown placeholder={this.props.componentState.intl.locale === 'en' ? 'IMDB RATING' : 'IMDB рейтинг'} fluid search selection options={this.props.componentState.intl.locale === 'en' ? this.state.imdb : this.state.imdbRU} onChange={this.changeRate}/>
                    </div>
                    <div className="param">                    
                        <Dropdown placeholder={this.props.componentState.intl.locale === 'en' ? 'GENRE' : 'Жанр'} fluid search multiple selection options={this.state.genre} onChange={this.changeGenre} onClose={this.sendGenre} />
                    </div>
                    <div className="param">                    
                        <Dropdown placeholder={this.props.componentState.intl.locale === 'en' ? 'SORT BY' : 'Сортировать'} fluid selection options={this.props.componentState.intl.locale === 'en' ? this.state.sortParam : this.state.sortParamRU} onChange={this.changeSort}/>
                    </div>
                </div>
                <div className="movies-all container">
                    <div className="row">
                    {
                        this.state.movies.map((mov, i) => {
                            return(
                                <div className={this.state.movies.length < 3 ? 'movie-item col-sm-6' : "movie-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12"} key={i}>
                                    <div className="poster">
                                        {
                                            mov.seen &&
                                            <div className="seen">
                                                <FormattedMessage id="library.watched" defaultMessage="WATCHED" />
                                            </div>
                                        }
                                        <img src={mov.poster} alt={mov.name}/>
                                        <button movnbr={mov.id} onClick={this.pushMovie}>
                                            <p>
                                                <i className="fas fa-play"></i>
                                            </p>
                                        </button>
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
                                        <button movnbr={mov.id} onClick={this.pushMovie}>
                                            {mov.name}
                                        </button>
                                    </div>
                                    <div className="genre">
                                        {typeof(mov.genre) !== "string" ? mov.genre.join(", ") : mov.genre}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        this.state.movies.length === 0 && this.state.isLoading === false && this.props.componentState.intl.locale === 'en' &&
                            <div style={{textAlign: "center"}}>
                                ┐('～`)┌  No results
                                <img src="./pics/no-results.png" alt="polar bear" style={{display: "block", width: "100%", marginTop: "5px"}}/>
                            </div>
                    }
                    {
                        this.state.movies.length === 0 && this.state.isLoading === false && this.props.componentState.intl.locale === 'ru' &&
                            <div style={{textAlign: "center"}}>
                                ┐('～`)┌  Нет результатов
                                <img src="./pics/no-results.png" alt="polar bear" style={{display: "block", width: "100%", marginTop: "5px"}}/>
                            </div>
                    }
                    {this.state.isLoading &&
                        <span style={{textAlign: 'center', width: '320px', display: "block", margin: "10px auto"}}>
                            {this.props.componentState.intl.locale === 'en' ? "Loading..." : "Пажжи, грузим..."}
                        </span>
                    }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

export default connect(mapStateToProps, null)(Library);