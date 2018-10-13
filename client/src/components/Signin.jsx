import React, { Component } from 'react';
import '../interface/style/signin.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import FacebookAuth from 'react-facebook-auth';

// ACTIONS from redux reduser
import { recordToken } from "../redux/actions";

const MyFacebookButton = ({ onClick }) => (
    <button onClick={onClick}>
        <i className="fab fa-facebook-square"></i>
    </button>
);

class Signin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            errors: ""
        };
        this.onChange = this.onChange.bind(this);        
        this.signinRequest = this.signinRequest.bind(this);
        this.signinFacebook = this.signinFacebook.bind(this);
    }

    signinRequest(event) {      
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.pass
        };
        fetch('http://127.0.0.1:8000/api/auth/login', {
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
                this.props.recordToken(responce.access_token);
                this.props.history.push('/');
            }
        });
    }

    signinFacebook(responce) {
        console.log("from FB: ", responce);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        console.log("history signin", this.props);
        return(
            <main className="signin-page">
                <header className="main-head">
                    <div className="main-head-logo">
                        <NavLink to="signin">
                            <img src="./pics/logo.png" alt="our logo" />
                            <p>hypertube</p>
                        </NavLink>
                    </div>
                    <div className="language-holder">
                        <span className="language-option">
                            <NavLink role="button" to="EN" >
                                EN
                            </NavLink>
                        </span>
                        <NavLink role="button" to="RU" className="disabled">
                            RU
                        </NavLink>
                    </div>
                    <div className="main-head-btn-holder">
                        <p className="main-head-btn-description">
                            Need an account?
                        </p>
                        <NavLink role="button" to="signup" className="main-head-btn">
                            Sign up
                        </NavLink>
                    </div>
                </header>
                <section className="signin-page-content">
                    <div className="back-s-u"></div>
                    <h1>
                        Hello. 
                        <NavLink to="signup" style={{marginLeft: "15px"}}>
                            Try Hypertube. 
                        </NavLink>
                    </h1>
                    <h3 >
                        The only legal online movie theatre in Unit Factory
                    </h3>
                    <div className="signin-form-holder">
                        <aside>
                            <img src="./pics/bg-crop.png" alt="flat movie icons"/>
                        </aside>
                        <div className="signin-form">
                            <form onSubmit={this.signinRequest}>
                                <div className="form-foreword">
                                    Sign in with login
                                </div>
                                {
                                    this.state.errors.length !== 0 && 
                                        <div className="form-error">
                                            {this.state.errors}
                                        </div>
                                }
                                <div className="my-row">
                                    <div className="input-holder">
                                        <input type="text" placeholder="Email" required id="email" name="email" onChange={this.onChange}/>
                                        <label htmlFor="login">
                                            <i className="fa fa-envelope"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder">
                                        <input type="password" placeholder="Password" required id="pass" name="pass" onChange={this.onChange}/>
                                        <label className="input-icon" htmlFor="pass">
                                            <i className="fa fa-key"></i>
                                        </label>
                                        <NavLink to="resetpass" className="reset-pass">
                                            Forgot?
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder form-button">
                                        <button className="form-btn-submit">Sign in</button>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="alternatieve">
                                        <h4>
                                            OR
                                        </h4>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <h4>
                                        Sign in with social network
                                    </h4>
                                </div>
                                <div className="my-row">
                                    <div className="social-media">
                                        <div>
                                            <FacebookAuth
                                                appId="292030674968220"
                                                callback={(res) => this.signinFacebook(res)}
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
        recordToken: str => dispatch(recordToken(str))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);