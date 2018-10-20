import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './Cabinet.css';
import { Image, Icon, Input , Grid, List, Button} from 'semantic-ui-react';

class Cabinet extends Component {
  render() {
    return (
      <div className="Cabinet">
          <div className="avatar">
              <Grid columns={1}>
              <Grid.Column>
                  <Image
                      fluid
                      label={{ as: 'a', color: 'red', corner: 'right', icon: 'save' }}
                      src='https://www.xda-developers.com/files/2018/01/6f826ZG-768x1024.jpg'
                  />
              </Grid.Column>
              </Grid>
          </div>
          <div className="infoUser">
              <List>
                  <List.Item icon='user' content='Firstname Lastname' />
                  <List.Item
                      icon='mail'
                      content={<a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>}
                  />
              </List>
          </div>
          <div className="infoUserInputs">
              <Input iconPosition='left' placeholder='Email'>
                  <Icon name='at' />
                  <input />
              </Input>
          </div>
          <div>
              <Input iconPosition='left' placeholder='Username'>
                  <Icon name='user' />
                  <input />
              </Input>
          </div>
          <div>
              <Input iconPosition='left' placeholder='Password'>
                  <Icon name='privacy' />
                  <input />
              </Input>
          </div>
          <div>
              <Input iconPosition='left' placeholder='Firstname'>
                  <Icon name='address book' />
                  <input />
              </Input>
          </div>
          <div>
              <Input iconPosition='left' placeholder='Lastname'>
                  <Icon name='address book' />
                  <input />
              </Input>
          </div>
          <Button>Change info</Button>
          <div className="lastSeen">
              <Grid container columns={3}>
                  <Grid.Column>
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
                  </Grid.Column>
                  <Grid.Column>
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
                  </Grid.Column>
                  <Grid.Column>
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
                  </Grid.Column>
                  <Grid.Column>
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
                  </Grid.Column>
                  <Grid.Column>
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
                  </Grid.Column>
                  <Grid.Column>
                      <Image src='https://assets.mubi.com/images/notebook/post_images/22267/images-w1400.jpg?1474980339' />
                  </Grid.Column>
              </Grid>
          </div>
      </div>
    );
  }
}

export default Cabinet;
