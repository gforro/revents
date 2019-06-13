import React from 'react';
import {Icon, Segment} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon color="red" name="map marker alternate" size="big" />;

const EventDetailedMap = ({lat, lng}) => {
  const zoom = 14;

  return (
    <Segment attached="bottom" style={{padding: 0}}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACE_API_KEY }}
          defaultCenter={{lat, lng}}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>

    </Segment>
  );
};

export default EventDetailedMap;
