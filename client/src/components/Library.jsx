import React, { Component } from 'react';
import '../interface/style/library.css';
import { Dropdown, Button, Input } from 'semantic-ui-react';
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
            genreRU: [
                {
                    key: 'animation',
                    value: 'мультфильм',
                    text: 'Мультфильм'
                },
                {
                    key: 'action',
                    value: 'боевик',
                    text: 'Боевик'
                },
                {
                    key: 'comedy',
                    value: 'комедия',
                    text: 'Комедия'
                },
                {
                    key: 'drama',
                    value: 'драма',
                    text: 'Драма'
                },
                {
                    key: 'fantasy',
                    value: 'фэнтези',
                    text: 'Фэнтези'
                },
                {
                    key: 'horror',
                    value: 'ужасы',
                    text: 'Ужасы'
                },
                {
                    key: 'love',
                    value: 'мелодрама',
                    text: 'Мелодрама'
                },
                {
                    key: 'mystery',
                    value: 'детектив',
                    text: 'Детектив'
                },   
                {
                    key: 'thriller',
                    value: 'триллер',
                    text: 'Триллер'
                }
            ],
            sortParam: [
                {
                    key: 'name',
                    value: 'name',
                    text: 'Original name'
                },
                {
                    key: 'pop',
                    value: 'rating',
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
                    text: 'По оригинальному названию'
                },
                {
                    key: 'year',
                    value: 'year',
                    text: 'По году'
                },
                {
                    key: 'pop',
                    value: 'rating',
                    text: 'По популярности'
                }
            ],
            movies: [],
            hasMore: true,
            isLoading: false,
            currentSortParam: "rating",
            sortWasChanged: false,
            order: "desc",
            imdbMin: "",
            currentGenre: props.componentState.intl.locale === "en" ? ["all"] : ["все"],
            pageStart: 1,
            error: "",
            movieTitle: "",
            rememberPrevRes: 0,
            lang: props.componentState.intl.locale,
            searchTitle: false
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

    componentWillReceiveProps(nextProps) {
        if (this._mount && this.state.lang !== nextProps.componentState.intl.locale) {
            const needToChangeSort = this.state.sortWasChanged;
            const sortParam = this.state.currentSortParam;
            this.setState({
                currentSortParam: needToChangeSort === false ? "rating" : sortParam,
                order: sortParam === "rating" ? "desc" : "asc",
                movies: [],
                pageStart: 1,
                hasMore: true,
                lang: nextProps.componentState.intl.locale
            }, () => this.loadItems());
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
        this._mount = false;
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token === null) {
            this.props.history.push('/signin');
        } else {
            this._mount = true;
            window.addEventListener('scroll', this.handleScroll);
            this.loadItems();
        }
    }

    handleScroll() {
        if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight && !this.state.isLoading) {
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
        });
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
        if (JSON.stringify(this.state.yearGap) !== JSON.stringify(this.state.prevYearGap)) {
            const needToChangeSort = this.state.sortWasChanged;
            const sortParam = this.state.currentSortParam;
            this.setState({
                pageStart: 1,
                movies: [],
                currentSortParam: needToChangeSort === false ? "name" : sortParam,
                order: "asc",
                yearGap: yearGap,
                hasMore: true,
                prevYearGap: JSON.parse(JSON.stringify(yearGap))
            }, () => this.loadItems());
        } 
        else {
            this.setState({
                yearGap: yearGap,
                prevYearGap: JSON.parse(JSON.stringify(yearGap))
            })
        }
    }

    changeRate(event, data) {
        if (data.value !== this.state.imdbMin) {
            const needToChangeSort = this.state.sortWasChanged;
            const sortParam = this.state.currentSortParam;
            this.setState({
                currentSortParam: needToChangeSort === false ? "name" : sortParam,
                order: "asc",
                imdbMin: data.value,
                pageStart: 1,
                movies: [],
                hasMore: true
            }, () => this.loadItems());
        }
    }

    changeGenre(event, data) {
        const currentLength = this.state.currentGenre.length;
        this.setState({
            currentGenre: data.value,
        });
        if (currentLength > data.value.length) {
            this.sendGenre();
        }
    }

    sendGenre() {
        const needToChangeSort = this.state.sortWasChanged;
        const sortParam = this.state.currentSortParam;
        this.setState({
            currentSortParam: needToChangeSort === false ? "name" : sortParam,
            order: "asc",
            movies: [],
            pageStart: 1,
            hasMore: true
        }, () => this.loadItems());
    }

    changeSort(event, data){
        if (this.state.currentSortParam !== data.value) {
            if (data.value === 'rating') {
                this.setState({
                    sortWasChanged: true,
                    currentSortParam: "rating",
                    order: "desc",
                    movies: [],
                    pageStart: 1,
                    hasMore: true
                }, () => this.loadItems());
            } else if (data.value === 'name'){
                this.setState({
                    sortWasChanged: true,
                    currentSortParam: "name",
                    order: "asc",
                    movies: [],
                    pageStart: 1,
                    hasMore: true
                }, () => this.loadItems());
            } else if (data.value === 'year'){
                this.setState({
                    sortWasChanged: true,
                    currentSortParam: "year",
                    order: "asc",
                    movies: [],
                    pageStart: 1,
                    hasMore: true
                }, () => this.loadItems());
            }
        }
    }

    loadItems = () => {
        if (this._mount && this.state.hasMore) {
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

            this.setState({ isLoading: true }, () => {
                const token = localStorage.getItem('token');
                if (this.state.searchTitle === false) {
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
                    fetch('http://localhost:8000/api/library/load-items', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }).then((res) => res.json())
                        .then((responce) => {
                            if (!this._mount) {
                                return ;
                            }
                            this.setState({
                                isLoading: false,
                                pageStart: data.page + 1,
                                hasMore: responce.hasMore,
                                movies: [
                                    ...this.state.movies,
                                    ...responce.data
                                ]
                            })
                        });
                } else {
                    const data = {
                        lang: this.props.componentState.intl.locale,
                        page: this.state.pageStart,
                        title: encodeURIComponent(this.state.movieTitle)
                    }
                    fetch('http://localhost:8000/api/library/load-items-by-title', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    })
                    .then((res) => res.json())
                    .then((responce) => {
                        if (!this._mount) {
                            return ;
                        }
                        this.setState({
                            isLoading: false,
                            pageStart: data.page + 1,
                            hasMore: responce.hasMore,
                            movies: [
                                ...this.state.movies,
                                ...responce.data
                            ]
                        })
                    });
                }
            });
        }
    }

    recordSearchTitle(e){
        if (e.target.value !== "") {
            this.setState({
                movieTitle: e.target.value
            });
        } else {
            this.setState({
                movieTitle: e.target.value,
                searchTitle: false
            });
        }
    }

    sendMovTitle(){
        const needToChangeSort = this.state.sortWasChanged;
        const sortParam = this.state.currentSortParam;
        this.setState({
            currentSortParam: needToChangeSort === false ? "name" : sortParam,
            hasMore: true,
            order: "asc",
            movies: [],
            pageStart: 1,
            currentGenre: ["all"],
            searchTitle: true
        }, () => this.loadItems());
    }

    pushMovie(e){
        e.preventDefault();
        const movId = e.currentTarget.getAttribute('movnbr');
        this.props.history.push('/movie/' + movId);
    }

    render() {
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
                        <Input disabled={this.state.isLoading || this.state.searchTitle} className="year-select-input-ru" pattern="[0-9]*" placeholder={this.props.componentState.intl.locale === 'en' ? 'From...' : 'С...'} onChange={this.changeMinYear} style={{margin: "0 5px"}} value={this.state.yearGap.min}/>
                        <Input disabled={this.state.isLoading || this.state.searchTitle} className="year-select-input-ru" pattern="[0-9]*" placeholder={this.props.componentState.intl.locale === 'en' ? 'To...' : 'По...'} onChange={this.changeMaxYear} value={this.state.yearGap.max}/>
                        <Button disabled={this.state.isLoading || this.state.searchTitle} color='purple' onClick={() => this.sendYear()} style={{marginLeft: "5px"}}>
                            <Button.Content visible>{this.props.componentState.intl.locale === 'en' ? "Go" : "Вперед"}</Button.Content>
                        </Button>
                    </div>
                </div>
                <div className="control column">
                    <div className="param">                    
                        <Dropdown disabled={this.state.isLoading || this.state.searchTitle} placeholder={this.props.componentState.intl.locale === 'en' ? 'IMDB RATING' : 'IMDB рейтинг'} fluid search selection options={this.props.componentState.intl.locale === 'en' ? this.state.imdb : this.state.imdbRU} onChange={this.changeRate}/>
                    </div>
                    <div className="param">                    
                        <Dropdown disabled={this.state.isLoading || this.state.searchTitle} placeholder={this.props.componentState.intl.locale === 'en' ? 'GENRE' : 'Жанр'} fluid search multiple selection options={this.props.componentState.intl.locale === 'en' ? this.state.genre : this.state.genreRU} onChange={this.changeGenre} onClose={this.sendGenre} />
                    </div>
                    <div className="param">                    
                        <Dropdown disabled={this.state.isLoading || this.state.searchTitle} placeholder={this.props.componentState.intl.locale === 'en' ? 'SORT BY' : 'Сортировать'} fluid selection options={this.props.componentState.intl.locale === 'en' ? this.state.sortParam : this.state.sortParamRU} onChange={this.changeSort} value={this.state.currentSortParam}/>
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