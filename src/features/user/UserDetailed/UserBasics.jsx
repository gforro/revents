import React from 'react';
import {Item} from 'semantic-ui-react';
import {Header, Segment} from 'semantic-ui-react';
import {differenceInYears} from 'date-fns';
import LazyLoad from 'react-lazyload';

const UserBasics = ({profile: {displayName, dateOfBirth, city, occupation, photoURL }}) => {
  const age = dateOfBirth && differenceInYears(new Date(), dateOfBirth.toDate());
  return (
    <Segment>
      <Item.Group>
        <Item>
          <LazyLoad placeholder={<Item.Image avatar size='small' src="/assets/user.png" />}>
            <Item.Image avatar size='small' src={photoURL || '/assets/user.png'}/>
          </LazyLoad>

          <Item.Content verticalAlign='bottom'>
            <Header as='h1'>{displayName}</Header>
            {occupation &&
            <>
              <br/>
              <Header as='h3'>{occupation}</Header>
            </>}
            <br/>
            <Header as='h3'>{age || 'Unknown age'}, Lives in {city || 'unknown city'}</Header>
          </Item.Content>
        </Item>
      </Item.Group>

    </Segment>
  );
};

export default UserBasics;
