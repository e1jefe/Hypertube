import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal, Dimmer, Loader } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { updateIntl } from 'react-intl-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../interface/style/reset.css';

class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPass: "",
            newPass2: "",
            email: "",
            errors: {},
            showModal: false,
            lang: props.componentState.intl.locale,
            processing: false
        };
        this.changeLanguage = this.changeLanguage.bind(this);
        this.setNewPass = this.setNewPass.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.redirectSignin = this.redirectSignin.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== "") {
            this.props.history.push('/');
        } else {
            this._mount = true;
        }
    }

    componentWillUnmount() {
        this._mount = false;
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

    setNewPass(event) {
        event.preventDefault();
        if (this.state.newPass !== this.state.newPass2) {
            const msg = this.props.componentState.intl.locale === "en" ? 'Password confirmation does not match password' : 'Пароли не совпадают';
            toast.error(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            return false;
        }
        const data = {
            email: this.state.email,
            password: this.state.newPass,
            password_confirmation: this.state.newPass2,
            token: this.props.match.params.token
        };
        this.setState({
            processing: true
        })
        fetch('http://127.0.0.1:8000/api/password/reset', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((res) => res.json())
        .then((responce) => {
            if (!this._mount) {
                return ;
            }
            if (responce.errors !== undefined) {
                this.setState({
                    processing: false
                });
                const msg = this.state.lang === 'en' ? 'The given data was invalid' : 'Некорректные данные';
                toast.error(msg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                if (responce.message !== "This password reset token is invalid.") {
                    this.setState({
                        showModal: true,
                        processing: false
                    })
                } else if (responce.message === "This password reset token is invalid.") {
                    this.setState({
                        processing: false
                    })
                    const msg = this.props.componentState.intl.locale === "en" ? 'You have already changed your password or entered wrong email' : 'Вы уже изменили свой пароль или некорректно введен email';
                    toast.error(msg, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
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
        });
        this.redirectSignin();
    }

    redirectSignin() {
        this.props.history.push('/signin');
    }

    render() {
        return (
            <main className="reset-page">
                <ToastContainer autoClose={5000} position="top-center" hideProgressBar={true}/>
                <header className="main-head">
                    <div className="main-head-logo">
                        <NavLink to="signin">
                            <img src="../pics/logo.png" alt="our logo" />
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
                        <button className="main-head-btn" onClick={this.redirectSignin}>
                            <FormattedMessage id="reset.signin" defaultMessage="Sign in" />
                        </button>
                    </div>
                </header>
                <section className="reset-page-content">
                    <div className="reset-form-holder">
                        <div className="reset-form">
                            <form onSubmit={this.resetRequest}>
                                <div className="my-row">
                                    <img src="../pics/madagascar.png" alt="flat movie icons"/>
                                </div>
                                <div className="form-foreword">
                                    <FormattedMessage id="reset.title" defaultMessage="Reset password" />
                                </div>
                                <div className="my-row">
                                    <div className="input-holder">
                                        <input type="text" placeholder="Email" required id="email" name="email" onChange={this.onChange} maxLength="150"/>
                                        <label htmlFor="email">
                                            <i className="fa fa-envelope"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder tooltip-castom">
                                        <span className="tooltiptext pass">
                                            {this.state.lang === 'en' ? "Minimum 7 characters, at least 1 number, upper and lovercase letter" : "Минимум 7 символов, хотя бы 1 цифра, большая и маленькая буква" }</span>
                                        <input type="password" placeholder={this.state.lang === 'en' ? "Password" : "Пароль"} required id="pass" onChange={this.onChange} name="newPass" maxLength="150"/>
                                        <label className="input-icon" htmlFor="pass">
                                            <i className="fa fa-key"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder tooltip-castom">
                                        <input type="password" placeholder={this.state.lang === 'en' ? "Password confirmation" : "Подтвердить пароль"} required id="pass2" onChange={this.onChange} name="newPass2" maxLength="150"/>
                                        <label className="input-icon" htmlFor="pass2">
                                            <i className="fa fa-key"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder form-button">
                                        <button className="form-btn-submit" onClick={this.setNewPass} disabled={this.state.email === "" || this.state.newPass === "" || this.state.newPass2 === ""}>
                                            <FormattedMessage id="reset.btn" defaultMessage="Reset" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <Dimmer active={this.state.processing}>
                            <Loader active>
                                {this.state.lang === 'en' ? "Setting a new password for you" : "Пожалуйста, подождите"}
                            </Loader>
                        </Dimmer>
                    </div>
                    <div>
                        <Modal open={this.state.showModal} onClose={this.closeModal} basic size='small' className="myResetModal">
                        <Header icon='unlock alternate' content={this.state.lang === 'en' ? "Success" : "Успех"} />
                            <Modal.Content>
                                <h3>
                                    {this.state.lang === 'en' ? "We set a new password for your account" : "Мы установили новый пароль для вашего аккаунта"}
                                </h3>
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
        updateIntl: obj => dispatch(updateIntl(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);