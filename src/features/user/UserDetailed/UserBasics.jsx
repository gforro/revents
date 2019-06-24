import React from 'react';
import {Item} from 'semantic-ui-react';
import {Header, Segment} from 'semantic-ui-react';
import {differenceInYears} from 'date-fns';

const UserBasics = ({profile: {displayName, dateOfBirth, city, occupation, photoURL }}) => {
  const age = dateOfBirth && differenceInYears(new Date(), dateOfBirth.toDate());
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image avatar size='small' src={photoURL || '/assets/user.png'}/>
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
