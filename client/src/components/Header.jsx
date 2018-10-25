import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../interface/style/header.css';
import { connect } from 'react-redux';
import { addLocaleData, FormattedMessage } from 'react-intl';
import ruLocaleData from 'react-intl/locale-data/ru';
import { updateIntl } from 'react-intl-redux';

// ACTIONS from redux reduser
import { logout } from "../redux/actions";

addLocaleData([...ruLocaleData]);


class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            lang: props.componentState.intl.locale
        };
        this.logout = this.logout.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    logout() {
        const token = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/api/auth/logout', {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => res.json())
        .then((responce) => {
            this.props.logout();
            localStorage.removeItem('token');
            this.props.history.push('/signin');
        });
    }

    changeLanguage(str) {
        if (str === 'ru') {
            this.props.updateIntl({
                locale: "ru",
                messages: Object.assign({
                    'header.profile': 'Кабинет',
                    'header.library': 'Фильмы',
                    'header.logout': 'Выход',
                    'library.title': 'Фильмы',
                    'library.year': 'Выберите год',
                    'library.watched': 'ИГРАЛО',
                    'otherUser.title': 'Информация о пользователе',
                    'otherUser.visit': 'Последний раз был на сайте: ',
                    'сomments.title': 'Комментарии',
                    'сomments.sendbtn': 'Отправить',
                    'movie.year': 'Год: ',
                    'movie.length': 'Длительность: ',
                    'movie.imdb': 'IMDB рейтинг: ',
                    'movie.country': 'Страна: ',
                    'movie.director': 'Режиссер: ',
                    'movie.stars': 'Актеры: ',
                    'movie.summary': 'Описание: ',
                    'movie.quality': 'Качество: ',
                    'movie.firstComment': 'Будь первым прокоментировавшим этот фильм',
                    'cabinet.changePassBtn': 'Сменить пароль',
                    'cabinet.changeInfoBtn': 'Изменить информацию',
                    'cabinet.noWatch': 'Вы еще ничего не посмотрели',
                    'footer.msg': 'Запилили: ',
                }, this.props.componentState.intl.mesagies),
            });
        } else {
            this.props.updateIntl({
                locale: "en",
                messages: {
                    'header.profile': 'Profile',
                    'header.library': 'Library',
                    'header.logout': 'Log out',
                    'library.title': 'Library',
                },
            });
        }
        this.setState({
            lang: str
        })
    }

    render() {
        return (
            <div>
                <div className="header">
                    <div className="logo">
                        <NavLink to="/library">
                            <img src="../pics/logo2.png" alt="hypertube"/>
                        </NavLink>
                    </div>
                    <div className="header-items">
                        <div className="links">
                            <div>
                                <NavLink to="/myProfile" >
                                    <FormattedMessage id="header.profile" defaultMessage="Profile" />
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to="/library" >
                                    <FormattedMessage id="header.library" defaultMessage="Library" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="languages">
                            <button onClick={() => this.changeLanguage('ru')} className={this.state.lang === 'ru' ? "active" : null}>
                                RU
                            </button>
                            <button onClick={() => this.changeLanguage('en')} className={this.state.lang === 'en' ? "active" : null}>
                                EN
                            </button>
                        </div>
                        <div className="logout">
                            <button onClick={this.logout}>
                                <FormattedMessage id="header.logout" defaultMessage="Log out" />
                            </button>
                        </div>
                    </div>
                </div>
                <header className="header-mob">
                    <div className="logo">
                        <NavLink to="/library">
                            <img src="../pics/logo2.png" alt="hypertube"/>
                        </NavLink>
                    </div>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                        <li>
                            <NavLink to="/myProfile">
                                <FormattedMessage id="header.profile" defaultMessage="Profile" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/library">
                                <FormattedMessage id="header.library" defaultMessage="Library" />
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={() => this.changeLanguage('ru')}>
                                RU
                            </button>
                        </li>
                        <li>
                            <button onClick={() => this.changeLanguage('en')}>
                                EN
                            </button>
                        </li>
                        <li>
                            <button onClick={this.logout}>
                                <FormattedMessage id="header.logout" defaultMessage="Log out" />
                            </button>
                        </li>
                    </ul>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        updateIntl: obj => dispatch(updateIntl(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);