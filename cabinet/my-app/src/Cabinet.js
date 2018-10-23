import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './Cabinet.css';
import { Image, Icon, Input , List, Button} from 'semantic-ui-react';

class Cabinet extends Component {
  render() {
    return (
      <div className="Cabinet container" >
          <div className="avatar row" >
              <div className="col-6 col-md-4">
                  <Image
                      fluid
                      label={{ as: 'a', color: 'red', corner: 'right', icon: 'save' }}
                      src='https://www.xda-developers.com/files/2018/01/6f826ZG-768x1024.jpg'
                  />
              </div>
              <div className="col-6 col-md-4">
              <List>
                  <List.Item icon='user' content='Username' />
                  <List.Item icon='user' content='Firstname Lastname' />
                  <List.Item
                      icon='mail'
                      content={<a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>}
                  />
              </List>
              </div>
              <div className="infoUser col-6 col-md-3">
              <Input iconPosition='left' placeholder='Email'>
                  <Icon name='at' />
                  <input />
              </Input>
              <Input iconPosition='left' placeholder='Username'>
                  <Icon name='user' />
                  <input />
              </Input>
              <Input iconPosition='left' placeholder='Firstname'>
                  <Icon name='address book' />
                  <input />
              </Input>
              <Input iconPosition='left' placeholder='Lastname'>
                  <Icon name='address book' />
                  <input />
              </Input>
              <Button>Change info</Button>
              <Input iconPosition='left' placeholder='Password'>
                  <Icon name='privacy' />
                  <input />
              </Input>
              <Input iconPosition='left' placeholder='Password confirmation'>
                  <Icon name='privacy' />
                  <input />
              </Input>
              <Button>Change password</Button>
              </div>
      </div>
<div className="Seen">
          <div className="lastSeen row">
              <div className="col-sm">
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
              </div>
              <div className="col-sm">
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
              </div>
              <div className="col-sm">
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
              </div>
              </div>
              <div className="lastSeen1 row">
              <div className="col-sm">
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
              </div>
              <div className="col-sm">
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
              </div>
              <div className="col-sm">
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
              </div>
          </div>
          </div>
      </div>
    );
  }
}

export default Cabinet;
