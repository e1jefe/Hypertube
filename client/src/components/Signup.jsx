import React, { Component } from 'react';
import '../interface/style/signup.css';
import { NavLink } from 'react-router-dom';
import { Button, Header, Image, Modal, Dimmer, Loader } from 'semantic-ui-react';
import FacebookAuth from 'react-facebook-auth';
import { connect } from 'react-redux';
import { recordToken } from "../redux/actions";
import { FormattedMessage } from 'react-intl';
import { updateIntl } from 'react-intl-redux';

const MyFacebookButton = ({ onClick }) => (
    <button onClick={onClick}>
        <i className="fab fa-facebook-square"></i>
    </button>
);

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            login: "",
            pass: "",
            email: "",
            errors: [],
            showModal: false,
            lang: props.componentState.intl.locale,
            processing: false
        };
        this.changeLanguage = this.changeLanguage.bind(this);
        this.onChange = this.onChange.bind(this);        
        this.signupRequest = this.signupRequest.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.signupFacebook = this.signupFacebook.bind(this);
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
                    'reset.btn': 'Восстановить',
                },
            });
        } else {
            this.props.updateIntl({
                locale: "en",
                messages: {
                    'signup.account': 'Already registered?',
                    'signup.signin': 'Sign in',
                    'signup.greeting': 'Hello. ',
                    'signup.try': ' Try Hypertube.',
                    'signup.legal': 'The only legal online movie theatre in Unit Factory',
                    'signup.title': 'Register accoutn',
                    'signup.btn': 'Sign up',
                    'signup.or': 'OR',
                    'signup.social': 'Sign up with social network'
                },
            });
        }
        this.setState({
            lang: str
        })
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signupRequest(event) {
        event.preventDefault();
        this.setState({
            errors: [],
            processing: true
        });
        const data = {
            name: this.state.login,
            password: this.state.pass,
            password_confirmation: this.state.pass,
            firstname: this.state.fname,
            lastname: this.state.lname,
            email: this.state.email,
        };
        fetch('http://127.0.0.1:8000/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((res) => res.json())
        .then((responce) => {
            if (responce.errors !== undefined) {
                let lang = this.state.lang;
                if (lang === 'en') {
                    this.setState({
                        errors: responce.errors,
                        processing: false
                    });
                } else {
                    let errorsRU = {};
                    for (let err in responce.errors) {
                        errorsRU[err] = err === 'email' ? "Этот email уже занят" : err === 'password' ? "Не валидный пароль" : responce.errors[err];
                    };
                    this.setState({
                        errors: errorsRU,
                        processing: false
                    });
                }
            } else {
                this.setState({
                    showModal: true,
                    processing: false,
                    errors: []
                });
            }
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    signupFacebook(responce) {
        console.log("from FB: ", responce);
        if (responce.error === undefined) {
            const name = responce.name.split(" ");
            const data = {
                firstName: name[0],
                lastName: name[1],
                email: responce.email,
                password: "iP0pka7!",
                password_confirmation: "iP0pka7!"
            };
            fetch('http://127.0.0.1:8000/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then((res) => res.json())
            .then((responce) => {
                //some method after success registering throught FB
                // this.props.recordToken(token for record in store);
                // this.props.history.push('/');
            });
        }
    }

    render() {
        console.log("props signup", this.props);

        return(
            <main className="signup-page">
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
                            <FormattedMessage id="signup.account" defaultMessage="Already registered?" />
                        </p>
                        <NavLink role="button" to="signin" className="main-head-btn">
                            <FormattedMessage id="signup.signin" defaultMessage="Sign in" />
                        </NavLink>
                    </div>
                </header>
                <section className="signup-page-content">
                    <div className="back-s-u"></div>
                    <h1>
                        <FormattedMessage id="signup.greeting" defaultMessage="Hello. " />
                        <NavLink to="signin" style={{marginLeft: "15px"}}>
                            <FormattedMessage id="signup.try" defaultMessage=" Try Hypertube." />
                        </NavLink>
                    </h1>
                    <h3>
                        <FormattedMessage id="signup.legal" defaultMessage="The only legal online movie theatre in Unit Factory" />
                    </h3>
                    <div className="signup-form-holder">
                        <aside>
                            <img src="./pics/bg-crop.png" alt="flat movie icons"/>
                        </aside>
                        <div className="signup-form">
                            <form onSubmit={this.signupRequest}>
                                <div className="form-foreword">
                                    <FormattedMessage id="signup.title" defaultMessage="Register accoutn" />
                                </div>
                                {
                                    this.state.errors.length !== 0 && 
                                    <div className="form-error">
                                        {
                                            Object.keys(this.state.errors).map((er) => {
                                                return (
                                                    <p key={er}>
                                                        {this.state.errors[er]}
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                <div className="my-row">
                                    <div className="input-holder">
                                        <input type="text" placeholder={this.state.lang === 'en' ? "First Name" : "Имя"} required id="fname" onChange={this.onChange} name="fname"/>
                                    </div>
                                    <div className="input-holder">
                                        <input type="text" placeholder={this.state.lang === 'en' ? "Last Name" : "Фамилия"} required id="lname" onChange={this.onChange} name="lname"/>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder tooltip-castom">
                                        <span className="tooltiptext">
                                            {this.state.lang === 'en' ? "Minimum 5 characters" : "Минимум 5 символов"}</span>
                                        <input type="text" placeholder={this.state.lang === 'en' ? "Login" : "Имя пользователя"} required id="login" onChange={this.onChange} name="login"/>
                                        <label htmlFor="login">
                                            <i className="fa fa-user"></i>
                                        </label>
                                    </div>
                                    <div className="input-holder tooltip-castom">
                                        <span className="tooltiptext pass">
                                            {this.state.lang === 'en' ? "Minimum 7 characters, at least 1 number, upper and lovercase letter" : "Минимум 7 символов, хотя бы 1 цифра, большая и маленькая буква" }</span>
                                        <input type="password" placeholder={this.state.lang === 'en' ? "Password" : "Пароль"} required id="pass" onChange={this.onChange} name="pass"/>
                                        <label className="input-icon" htmlFor="pass">
                                            <i className="fa fa-key"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder input-email tooltip-castom">
                                        <span className="tooltiptext email">
                                            {this.state.lang === 'en' ? "Please provide a real one, we will send you a confirmation link" : "Настоящий, пожалуйста, мы от правим ссылку для подтверждения аккаунта"}</span>
                                        <input type="email" placeholder="Email" required id="email" onChange={this.onChange} name="email"/>
                                        <label className="input-icon" htmlFor="email">
                                            <i className="fa fa-envelope"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder form-button">
                                        <button className="form-btn-submit">
                                            <FormattedMessage id="signup.btn" defaultMessage="Sign up" />
                                        </button>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="alternatieve">
                                        <h4>
                                            <FormattedMessage id="signup.or" defaultMessage="OR" />
                                        </h4>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <h4>
                                        <FormattedMessage id="signup.social" defaultMessage="Sign up with social network" />
                                    </h4>
                                </div>
                                <div className="my-row">
                                    <div className="social-media">
                                        <div>
                                            <FacebookAuth
                                                appId="292030674968220"
                                                callback={this.signupFacebook}
                                                component={MyFacebookButton}
                                                />
                                        </div>
                                        <div>
                                            <i className="fab fa-twitter-square"></i>
                                        </div>
                                        <div className="fortytwo"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <div>
                    <Modal dimmer="blurring" open={this.state.showModal} onClose={this.closeModal}>
                    <Modal.Header>
                        {this.state.lang === 'en' ? "Success" : "Успех"}
                    </Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size={window.innerWidth < 416 ? 'small' : 'medium'} src='./pics/projector-camera.png' />
                        <Modal.Description>
                        <Header>
                            {this.state.lang === 'en' ? "Your account was registered" : "Ваш аккаунт зарегестрирован"}
                        </Header>
                        <p>
                            {this.state.lang === 'en' ? "We sent you an activation link to given email." : "Мы отправили ссылку для активации аккаунта на указаный email."}
                        </p>
                        <p>
                            {this.state.lang === 'en' ? "Please, follow it to activate your account." : "Пожалуйста, перейдите по ней."}
                        </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content={this.state.lang === 'en' ? "Got it" : "Понял"}
                            onClick={this.closeModal}
                        />
                    </Modal.Actions>
                    </Modal>
                </div>
                <div>
                    <Dimmer active={this.state.processing}>
                        <Loader active>
                            {this.state.lang === 'en' ? "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Baiking coockies" : "Пожалуйста, подождите"}
                        </Loader>
                    </Dimmer>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);