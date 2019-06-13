import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Icon} from 'semantic-ui-react';

const AnyReactComponent = () => <Icon color="red" name="map marker alternate" size="big" />;

const TestMap = ({latLng, zoom}) => (
      // Important! Always set the container height explicitly
      <div style={{ height: '30vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACE_API_KEY }}
          defaultCenter={latLng}
          defaultZoom={zoom}
        >
          <AnyReactComponent {...latLng} />
        </GoogleMapReact>
      </div>
    );


export default TestMap;
