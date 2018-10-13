import React, { Component } from 'react';
import '../interface/style/signup.css';
import { NavLink } from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import FacebookAuth from 'react-facebook-auth';
import { connect } from 'react-redux';
import { recordToken } from "../redux/actions";

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
            showModal: false
        };
        this.onChange = this.onChange.bind(this);        
        this.signupRequest = this.signupRequest.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.signupFacebook = this.signupFacebook.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signupRequest(event) {      
        event.preventDefault();
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
                this.setState({
                    errors: responce.errors
                });
            } else {
                this.setState({
                    showModal: true,
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
                            Already registered?
                        </p>
                        <NavLink role="button" to="signin" className="main-head-btn">
                            Sign in
                        </NavLink>
                    </div>
                </header>
                <section className="signup-page-content">
                    <div className="back-s-u"></div>
                    <h1>
                        Hello. 
                        <NavLink to="signin">
                             Try Hypertube.
                        </NavLink>
                    </h1>
                    <h3>
                        The only legal online movie theatre in Unit Factory
                    </h3>
                    <div className="signup-form-holder">
                        <aside>
                            <img src="./pics/bg-crop.png" alt="flat movie icons"/>
                        </aside>
                        <div className="signup-form">
                            <form onSubmit={this.signupRequest}>
                                <div className="form-foreword">
                                    Register accoutn
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
                                        <input type="text" placeholder="First Name" required id="fname" onChange={this.onChange} name="fname"/>
                                    </div>
                                    <div className="input-holder">
                                        <input type="text" placeholder="Last Name" required id="lname" onChange={this.onChange} name="lname"/>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder tooltip-castom">
                                        <span className="tooltiptext">Minimum 5 characters</span>
                                        <input type="text" placeholder="Login" required id="login" onChange={this.onChange} name="login"/>
                                        <label htmlFor="login">
                                            <i className="fa fa-user"></i>
                                        </label>
                                    </div>
                                    <div className="input-holder tooltip-castom">
                                        <span className="tooltiptext pass">Minimum 7 characters, at least 1 number and uppercase letter</span>
                                        <input type="password" placeholder="Password" required id="pass" onChange={this.onChange} name="pass"/>
                                        <label className="input-icon" htmlFor="pass">
                                            <i className="fa fa-key"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder input-email tooltip-castom">
                                        <span className="tooltiptext email">Please provide a real one, we will send you a confirmation link</span>
                                        <input type="email" placeholder="Email" required id="email" onChange={this.onChange} name="email"/>
                                        <label className="input-icon" htmlFor="email">
                                            <i className="fa fa-envelope"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="my-row">
                                    <div className="input-holder form-button">
                                        <button className="form-btn-submit">Sign up</button>
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
                                        Sign up with social network
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
                    <Modal.Header>Success</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size={window.innerWidth < 416 ? 'small' : 'medium'} src='./pics/projector-camera.png' />
                        <Modal.Description>
                        <Header>Your account was registered</Header>
                        <p>We sent you an activation link to given email.</p>
                        <p>Please, follow it to activate your account.</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Got it"
                            onClick={this.closeModal}
                        />
                    </Modal.Actions>
                    </Modal>
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
        recordToken: str => dispatch(recordToken(str))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);