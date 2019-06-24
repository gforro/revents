import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

const UserDetailedSidebar = () => {
  return (
    <Button color='teal' fluid basic content='Edit Profile' as={Link} to="/settings"/>
  );
};

export default UserDetailedSidebar;
