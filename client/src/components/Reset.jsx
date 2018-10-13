import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import '../interface/style/reset.css';

// ACTIONS from redux reduser
import { recordToken } from "../redux/actions";

class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            errors: {},
            showModal: false
        };
        this.resetRequest = this.resetRequest.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
                <section className="reset-page-content">
                    <div className="reset-form-holder">
                        <div className="reset-form">
                            <form onSubmit={this.resetRequest}>
                                <div className="my-row">
                                    <img src="./pics/madagascar.png" alt="flat movie icons"/>
                                </div>
                                <div className="form-foreword">
                                    Reset password
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
                                        <button className="form-btn-submit">Reset password</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <Modal open={this.state.showModal} onClose={this.closeModal} basic size='small'>
                            <Header icon='unlock alternate' content='Reset password' />
                            <Modal.Content>
                                <p>
                                    We have sent you a link to restore your password.
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' inverted onClick={this.closeModal}>
                                    <Icon name='checkmark' /> Got it
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
        recordToken: str => dispatch(recordToken(str))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);