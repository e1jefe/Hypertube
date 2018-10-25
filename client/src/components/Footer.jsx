import React, { Component } from 'react';
import '../interface/style/footer.css';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {
    render() {
        return (
            <footer>
                <FormattedMessage id="footer.msg" defaultMessage="Made by " />
                dsheptun, skorotko, vsarapin, inovykov, 2018
            </footer>
        );
    }
}

export default Footer;