import React, {Component} from 'react';
import '../interface/style/signin.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {updateIntl} from 'react-intl-redux';
import {Button, Header, Image, Modal, Dimmer, Loader} from 'semantic-ui-react';

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            errors: "",
            lang: props.componentState.intl.locale,
            showModal: false,
            processing: false
        };
        this.changeLanguage = this.changeLanguage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.signinRequest = this.signinRequest.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            this.props.history.push('/');
        } else {
            this._mount = true;
        }
    }

    componentWillUnmount() {
        this._mount = false;
    }

    closeModal() {
        this.setState({
            showModal: false
        });
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
                    'header.profile': 'Кабинет',
                    'header.library': 'Фильмы',
                    'header.logout': 'Выход',
                    'library.title': 'Фильмы',
                    'library.year': 'Выберите год',
                    'footer.msg': 'Запилили: ',
                },
            });
        } else {
            this.props.updateIntl({
                locale: "en",
                messages: {
                    'signin.account': 'Need an account?',
                    'signin.signup': 'Sign up',
                    'signin.greeting': 'Hello. ',
                    'signin.try': ' Try Hypertube.',
                    'signin.legal': 'The only legal online movie theatre in Unit Factory',
                    'signin.title': 'Sign in with email',
                    'signin.reset': 'Forgot?',
                    'signin.btn': 'Sign in',
                    'signin.or': 'OR',
                    'signin.social': 'Sign in with social network'
                },
            });
        }
        this.setState({
            lang: str
        })
    }

    signinRequest(event) {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.pass
        };
        this.setState({
            processing: true,
            errors: []
        });
        fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((res) => res.json())
            .then((responce) => {
                if (!this._mount) {
                    return ;
                }
                if (responce.message === "Unauthorized" || responce.message === "The given data was invalid.") {
                    if (this.state.lang === 'en') {
                        this.setState({
                            errors: "Something wrong with email or password",
                            processing: false
                        });
                    } else {
                        this.setState({
                            errors: "Проверьте email или пароль",
                            processing: false
                        });
                    }
                } else {
                    this.setState({
                        processing: false
                    });
                    localStorage.setItem('token', responce.access_token);
                    this.props.history.push('/');
                }
            });
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <main className="signin-page">
                <header className="main-head">
                    <div className="main-head-logo">
                        <NavLink to="signin">
                            <img src="./pics/logo.png" alt="our logo"/>
                            <p>hypertube</p>
                        </NavLink>
                    </div>
                    <div className="language-holder">
                        <span className="language-option">
                            <button onClick={() => this.changeLanguage('ru')}
                                    className={this.state.lang !== 'ru' ? "disabled" : null}>
                                RU
                            </button>
                        </span>
                        <button onClick={() => this.changeLanguage('en')}
                                className={this.state.lang !== 'en' ? "disabled" : null}>
                            EN
                        </button>
                    </div>
                    <div className="main-head-btn-holder">
                        <p className="main-head-btn-description">
                            <FormattedMessage id="signin.account" defaultMessage="Need an account?"/>
                        </p>
                        <NavLink role="button" to="signup" className="main-head-btn">
                            <FormattedMessage id="signin.signup" defaultMessage="Sign up"/>
                        </NavLink>
                    </div>
                </header>
                <section className="signin-page-content">
                    <div className="back-s-u"></div>
                    <h1>
                        <FormattedMessage id="signin.greeting" defaultMessage="Hello. "/>
                        <NavLink to="signup" style={{marginLeft: "15px"}}>
                            <FormattedMessage id="signin.try" defaultMessage=" Try Hypertube."/>
                        </NavLink>
                    </h1>
                    <h3>
                        <FormattedMessage id="signin.legal"
                                          defaultMessage="The only legal online movie theatre in Unit Factory"/>
                    </h3>
                    <div className="signin-form-holder">
                        <aside>
                            <img src="./pics/bg-crop.png" alt="flat movie icons"/>
                        </aside>
                        <div className="signin-form">
                            <form onSubmit={this.signinRequest}>
                                <div className="form-foreword">
                                    <FormattedMessage id="signin.title" defaultMessage="Sign in with email"/>
                                </div>
                                {
                                    this.state.errors.length !== 0 &&
                                    <div className="form-error">
                                        {this.state.lang === 'en' ? this.state.errors : 'Проверь email или пароль'}
                                    </div>
                                }
                                <div className="my-row">
                                    <div className="input-holder">
                                        <input type="text" placeholder="Email" required id="email" name="email"
                                               onChange={this.onChange} maxLength="150"/>
                                        <label htmlFor="email">
                                            <i className="fa fa-envelope"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder">
                                        <input type="password"
                                               placeholder={this.state.lang === 'en' ? "Password" : "Пароль"} required
                                               id="pass" name="pass" onChange={this.onChange} maxLength="150"/>
                                        <label className="input-icon" htmlFor="pass">
                                            <i className="fa fa-key"></i>
                                        </label>
                                        <NavLink to="resetpass" className="reset-pass">
                                            <FormattedMessage id="signin.reset" defaultMessage="Forgot?"/>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder form-button">
                                        <button className="form-btn-submit">
                                            <FormattedMessage id="signin.btn" defaultMessage="Sign in"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="alternatieve">
                                        <h4>
                                            <FormattedMessage id="signin.or" defaultMessage="OR"/>
                                        </h4>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <h4>
                                        <FormattedMessage id="signin.social"
                                                          defaultMessage="Sign in with social network"/>
                                    </h4>
                                </div>
                                <div className="my-row">
                                    <div className="social-media">
                                        <a href="http://localhost:8000/api/auth/login/github">
                                            <i className="fab fa-github-square"></i>
                                        </a>
                                        <a href="http://localhost:8000/api/auth/login/google">
                                            <i className="fab fa-google"></i>
                                        </a>
                                        <a className="fortytwo" href="http://localhost:8000/api/auth/login/intra">
                                            42
                                        </a>
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
                            <Image wrapped size={window.innerWidth < 416 ? 'small' : 'medium'}
                                   src='./pics/projector-camera.png'/>
                            <Modal.Description>
                                <Header>
                                    {this.state.lang === 'en' ? "Your account was registered" : "Ваш аккаунт зарегестрирован"}
                                </Header>
                                <p>
                                    {this.state.lang === 'en' ? "We sent you an activation link to given email." : "Мы отправили ссылку для активации аккаунта на указаный email."}
                                </p>
                                <p>
                                    {this.state.lang === 'en' ? "Please, follow it to activate your account." : "Пожалуйста, перейдите по ней"}
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
                            {this.state.lang === 'en' ? "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Baiking coockies" : "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Стелим красную ковровую дорожку"}
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
        updateIntl: obj => dispatch(updateIntl(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);