import React from 'react';
import {Header, Image} from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const Photos = ({photos}) => {
  return (
    <>
      <Header icon='image' content='Photos'/>

      <Image.Group size='small'>
        {photos.map(photo => (
          <LazyLoad key={photo.id} placeholder={<Image src="/assets/user.png"/>}>
            <Image src={photo.url} />
          </LazyLoad>
        ))}
      </Image.Group>
    </>
  );
};

export default Photos;
