import React from 'react';
import {Button, ButtonGroup, Card, Header, Image, Segment} from 'semantic-ui-react';

const UserPhotos = ({profile, photos, deleteImage, setMainImage}) => {
  return (
    <>
      <Header sub color='teal' content='All Photos'/>

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={profile.photoURL || '/assets/user.png'} />
          <Button positive>Main Photo</Button>
        </Card>

        {photos && photos.filter(p => p.url !== profile.photoURL).map(photo =>
          <Card key={photo.id}>
            <Image
              src={photo.url}
            />
            <ButtonGroup widths="two" attached="bottom">
              <Button onClick={() => setMainImage(photo)} basic color='green'>Main</Button>
              <Button onClick={() => deleteImage(photo)} basic icon='trash' color='red'/>
            </ButtonGroup>
          </Card>
        )}

      </Card.Group>
    </>
  );
};

export default UserPhotos;
