import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

const UserDetailedSidebar = ({ isCurrentUser} ) => {
  return isCurrentUser ?
        <Button color='teal' fluid basic content='Edit Profile' as={Link} to="/settings"/>
        :
        <Button color='teal' fluid basic content='Follow User'/>;
};

export default UserDetailedSidebar;
