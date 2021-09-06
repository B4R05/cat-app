import React from 'react';
import { Header, Icon, Segment, Container } from 'semantic-ui-react';
import Notification from '../../components/Notification';
import Uploader from '../../components/Uploader';

const Upload = () => (
  <Container>
    <Segment placeholder>
      <Header icon>
        <Icon name="upload" />
        <p>Select a cat image and upload it here!</p>
      </Header>
      <em style={{ textAlign: 'center' }}>(Only image files not exceeding 1mb will be accepted)</em>
      <br/>
      <Uploader/>
    </Segment>
    <Notification />
  </Container>
);

export default Upload;