import React from 'react';
import {Form, Segment, Button, Label, Divider} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {login, socialLogin} from '../authActions';
import {connect} from 'react-redux';
import SocialLogin from '../SocialLogin/SocialLogin';

const LoginForm = ({login, socialLogin, handleSubmit, error}) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(login)} autoComplete="off">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && <Label color="red">{error.message}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>
          or
        </Divider>
        <SocialLogin login={socialLogin}/>
      </Segment>
    </Form>
  );
};

const actions = {
  login,
  socialLogin
}

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));
