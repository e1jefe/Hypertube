import React, { Component } from 'react';
import '../interface/style/singleMovie.css';
import MyPlayer from './MyPlayer';
import Comments from './Comments.jsx';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import Trailer from "./Trailer";
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class SingleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            data: {},
            quality: null,
            trailerUrl: null,
            userId: "",
            watched: false,
            lang: props.componentState.intl.locale
        };
    }

    changeQuality(resolution) {
        if (!this._mount) {
            return ;
        }
        this.setState({
            quality: resolution
        });
        document.getElementById('1080').disabled = "disabled";
        document.getElementById('720').disabled = "disabled";
        if (!this.state.watched) {
            const data = {
                id_film: this.props.match.params.id
            };
            const token = localStorage.getItem('token');
            fetch('http://127.0.0.1:8000/api/cabinet/watched-films_create', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then((res) => res.json())
            .then((res) => {
                if (!this._mount) {
                    return ;
                }
                if (res === true) {
                    this.setState({
                        watched: true
                    });
                }
            });
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this._mount = true;
            fetch('http://127.0.0.1:8000/api/auth/user', {
                method: 'GET',
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => res.json())
            .then((res) => {
                if (this._mount) {
                    this.setState({
                        userId: res.id,
                        userAvatar: res.avatar
                    });
                }
            })
        } else {
            this.props.history.push('/signin');
        }
        const data = {
            lang: this.props.componentState.intl.locale,
            id: this.props.match.params.id
        };
        fetch('http://localhost:8000/api/library/load-mov-details', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
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
                data: {
                    title: responce.data.title,
                    year: responce.data.year,
                    runtime: responce.data.runtime,
                    rating: responce.data.rating,
                    plot: responce.data.plot,
                    poster: responce.data.poster,
                    director: responce.data.director,
                    actors: responce.data.actors,
                    country: responce.data.country.length !== 0 ? responce.data.country.join(", ") : this.props.componentState.intl.locale === 'en' ? 'No info' : 'Нет данных'
                },
                imdb_id: responce.data.imdb_id
            });
            if (responce.data.imdb_id !== '') {
                return axios.get('http://localhost:3001/youtube/' + responce.data.imdb_id);
            } else {
                return false;
            }
        })
        .then((response) => {
            if (this._mount && response !== false) {
                this.setState({
                    trailerUrl: response.data.url
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this._mount && this.state.lang !== nextProps.componentState.intl.locale) {
            const data = {
                lang: nextProps.componentState.intl.locale,
                id: this.props.match.params.id
            };
            fetch('http://localhost:8000/api/library/load-mov-details', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then((res) => res.json())
            .then((response) => {
                if (!this._mount) {
                    return ;
                }
                this.setState({
                    data: {
                        title: response.data.title,
                        year: response.data.year,
                        runtime: response.data.runtime,
                        rating: response.data.rating,
                        plot: response.data.plot,
                        poster: response.data.poster,
                        director: response.data.director,
                        actors: response.data.actors,
                        country: response.data.country.length !== 0 ? response.data.country.join(", ") : this.props.componentState.intl.locale === 'en' ? 'No info' : 'Нет данных'
                    },
                });
            });     
        }
    }

    componentWillUnmount() {
        this._mount = false;
    }

    render() {
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
                                <FormattedMessage id="movie.quality" defaultMessage="Quality: " />
                            </div>
                            <Button color='purple' id="720" onClick={() => this.changeQuality(720)}>720p</Button>
                            <Button color='purple' id="1080" onClick={() => this.changeQuality(1080)}>1080p</Button>
                        </div>
                    </div>
                </div>
                {
                    this.state.quality ? 
                        <MyPlayer id={this.state.imdb_id} quality={this.state.quality}/> 
                        :
                        this.state.trailerUrl !== null ?
                            <Trailer id={this.state.imdb_id} url={this.state.trailerUrl}/>
                            :
                            null
                }
                <Comments movid={this.props.match.params.id} master={this.state.userId} avatar={this.state.userAvatar}/>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

export default connect(mapStateToProps, null)(SingleMovie);