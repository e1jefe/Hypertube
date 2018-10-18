import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { addLocaleData, FormattedMessage } from 'react-intl';
import ruLocaleData from 'react-intl/locale-data/ru';
import { updateIntl } from 'react-intl-redux';

import '../interface/style/reset.css';

// ACTIONS from redux reduser
import { recordToken } from "../redux/actions";

addLocaleData([...ruLocaleData]);


class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            errors: {},
            showModal: false,
            lang: props.componentState.intl.locale
        };
        this.changeLanguage = this.changeLanguage.bind(this);
        this.resetRequest = this.resetRequest.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            this.props.history.push('/');
        }
    }

    changeLanguage(str) {
        if (str === 'ru') {
            this.props.updateIntl({
                locale: "ru",
                messages: {
                    'signup.account': 'Есть аккаунт?',
                    'signup.signin': 'Вход',
                    'signup.greeting': 'Привет. ',
                    'signup.try': ' Попробуй Hypertube.',
                    'signup.legal': 'Единственный не наказуемый способ смотреть фильмы в Юните',
                    'signup.title': 'Зарегестрироваться',
                    'signup.btn': 'Регистрация',
                    'signup.or': 'ИЛИ',
                    'signup.social': 'Войти через социальную сеть',
                    'signin.account': 'Еще нет аккаунта?',
                    'signin.signup': 'Регистрация',
                    'signin.greeting': 'Привет. ',
                    'signin.try': ' Попробуй Hypertube.',
                    'signin.legal': 'Единственный не наказуемый способ смотреть фильмы в Юните',
                    'signin.title': 'Войти по email',
                    'signin.reset': 'Забыл?',
                    'signin.btn': 'Войти',
                    'signin.or': 'ИЛИ',
                    'signin.social': 'Войти через социальную сеть',
                    'reset.account': 'Есть аккаунт?',
                    'reset.signin': 'Вход',
                    'reset.title': 'Восстановить пароль',
                    'reset.btn': 'Восстановить'
                },
            });
        } else {
            this.props.updateIntl({
                locale: "en",
                messages: {
                    'reset.account': 'Already registered?',
                    'reset.signin': 'Sign in',
                    'reset.title': 'Reset password',
                    'reset.btn': 'Reset'
                },
            });
        }
        this.setState({
            lang: str
        })
    }

    resetRequest(event) {
        event.preventDefault();
        const data = {
            email: this.state.email,
        };
        fetch('http://127.0.0.1:8000/api/password/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((res) => res.json())
        .then((responce) => {
            if (responce.message === "Unauthorized") {
                this.setState({
                    errors: "Something wrong with email or password"
                });
            } else {
                // this.props.recordToken(responce.access_token);
                // this.props.history.push('/');
                this.setState({
                    showModal: true
                })
            }
        });
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    render() {
        console.log("props reset", this.props);

        return (
            <main className="reset-page">
                <header className="main-head">
                    <div className="main-head-logo">
                        <NavLink to="signin">
                            <img src="./pics/logo.png" alt="our logo" />
                            <p>hypertube</p>
                        </NavLink>
                    </div>
                    <div className="language-holder">
                        <span className="language-option">
                            <button onClick={() => this.changeLanguage('ru')} className={this.state.lang !== 'ru' ? "disabled" : null}>
                                RU
                            </button>
                        </span>
                        <button onClick={() => this.changeLanguage('en')} className={this.state.lang !== 'en' ? "disabled" : null}>
                            EN
                        </button>
                    </div>
                    <div className="main-head-btn-holder">
                        <p className="main-head-btn-description">
                            <FormattedMessage id="reset.account" defaultMessage="Already registered?" />
                        </p>
                        <NavLink role="button" to="signin" className="main-head-btn">
                            <FormattedMessage id="reset.signin" defaultMessage="Sign in" />
                        </NavLink>
                    </div>
                </header>
                <section className="reset-page-content">
                    <div className="reset-form-holder">
                        <div className="reset-form">
                            <form onSubmit={this.resetRequest}>
                                <div className="my-row">
                                    <img src="./pics/madagascar.png" alt="flat movie icons"/>
                                </div>
                                <div className="form-foreword">
                                    <FormattedMessage id="reset.title" defaultMessage="Reset password" />
                                </div>
                                <div className="my-row">
                                    <div className="input-holder">
                                        <input type="text" placeholder="Email" required id="email" name="email" onChange={this.onChange}/>
                                        <label htmlFor="email">
                                            <i className="fa fa-envelope"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder form-button">
                                        <button className="form-btn-submit">
                                            <FormattedMessage id="reset.btn" defaultMessage="Reset" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <Modal open={this.state.showModal} onClose={this.closeModal} basic size='small'>
                            <Header icon='unlock alternate' content={this.state.lang === 'en' ? "Reset password" : "Восстановление пароля"} />
                            <Modal.Content>
                                <p>
                                    {this.state.lang === 'en' ? "We have sent you a link to restore your password." : "Мы отправили ссылку для восстановления пароля."}
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' inverted onClick={this.closeModal}>
                                    <Icon name='checkmark' /> {this.state.lang === 'en' ? "Got it" : "Понял"}
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                </section>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        recordToken: str => dispatch(recordToken(str)),
        updateIntl: obj => dispatch(updateIntl(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);