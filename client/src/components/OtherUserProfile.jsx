import React, { Component } from 'react';
import { Header, Image, Modal } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl';

class OtherUserProfile extends Component {

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
                <Image wrapped size='medium' src={this.props.propfile.ava !== undefined && this.props.propfile.ava !== null ? 'http://127.0.0.1:8000/' + this.props.propfile.ava : '../pics/avatar.png'} />
                <Modal.Description>
                    <Header>
                        {this.props.propfile.name}
                    </Header>
                    <p>
                        {this.props.propfile.login}
                    </p>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default OtherUserProfile;