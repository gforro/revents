import React from 'react';
import {Header, Icon, List} from 'semantic-ui-react';
import {Item} from 'semantic-ui-react';
import {Grid} from 'semantic-ui-react';
import {format} from 'date-fns';

const UserDetails = ({profile: {displayName, occupation, city, createdAt, interests, about}}) => {
  let interestsJsx = null;
  if (interests && interests.length > 0) {
    interestsJsx = (<List>
      {interests.map((interest, index) => (
        <Item key={index}>
          <Icon name='heart'/>
          <Item.Content>{interest}</Item.Content>
        </Item>
      ))}
    </List>);
  } else {
    interestsJsx = <span>No interest</span>;
  }
  return (
    <Grid columns={2}>
      <Grid.Column width={10}>
        <Header icon='smile' content={`About ${displayName}`}/>
        <p>I am a: <strong>{occupation || 'tbn'}</strong></p>
        <p>Originally from <strong>{city || 'tbn'}</strong></p>
        {createdAt && <p>Member Since: <strong>{format(createdAt.toDate(), 'do MMMM yyyy')}</strong></p>}
        <p>{about}</p>
      </Grid.Column>
      <Grid.Column width={6}>
        <Header icon='heart outline' content='Interests'/>
        {interestsJsx}
      </Grid.Column>
    </Grid>
  );
};

export default UserDetails;
