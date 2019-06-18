import React from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import {Redirect, Route, Switch} from 'react-router-dom';
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import {changePassword} from '../../auth/authActions';
import {connect} from 'react-redux';

const SettingsDashboard = ({providerId, changePassword}) => {
  return (
    <Grid>
      <GridColumn width="12">
        <Switch>
          <Route path="/settings/basic" component={BasicPage}/>
          <Route path="/settings/about" component={AboutPage}/>
          <Route path="/settings/photos" component={PhotosPage}/>
          <Route path="/settings/account" render={() => <AccountPage providerId={providerId} changePassword={changePassword} />}/>
          <Redirect to="/settings/basic"/>
        </Switch>
      </GridColumn>
      <GridColumn widht="4">
        <SettingsNav />
      </GridColumn>
    </Grid>
  );
}

const actions = {
  changePassword
}

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId
})

export default connect(mapState, actions)(SettingsDashboard);
