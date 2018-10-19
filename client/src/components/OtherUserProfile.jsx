import React, { Component } from 'react';
import { Header, Image, Modal } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl';

class OtherUserProfile extends Component {

    componentDidMount() {
        //make request to bd for getting user info
        console.log("in modal", this.props.id);
    }

    close(){
        this.props.closeModal();
    }

    render(){
        return(
            <Modal open={this.props.show} onClose={this.close.bind(this)}>
                <Modal.Header>
                    <FormattedMessage id="otherUser.title" defaultMessage="User info" />
                </Modal.Header>
                <Modal.Content image>
                <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                <Modal.Description>
                    <Header>User First Last name</Header>
                    <p>Login</p>
                    <p>
                        <FormattedMessage id="otherUser.visit" defaultMessage="Last seen: " />
                        10.10.2018
                    </p>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default OtherUserProfile;