import React from 'react';
import {Header, Image} from 'semantic-ui-react';

const Photos = ({photos}) => {
  return (
    <>
      <Header icon='image' content='Photos'/>

      <Image.Group size='small'>
        {photos.map(photo => <Image key={photo.id} src={photo.url} />)}
      </Image.Group>
    </>
  );
};

export default Photos;
