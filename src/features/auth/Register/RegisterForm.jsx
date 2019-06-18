import React from 'react';
import {Form, Segment, Button, Label, Divider} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {isRequired, combineValidators} from 'revalidate';
import {register, socialLogin} from '../authActions';
import {connect} from 'react-redux';
import SocialLogin from '../SocialLogin/SocialLogin';

const validator = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
});


const RegisterForm = ({error, submitting, invalid, handleSubmit, register: registerUser, socialLogin}) => {
  return (
    <div>
      <Form size="large" autoComplete="off" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && <Label color="red">{error}</Label>}
          <Button disabled={invalid || submitting} fluid size="large" color="teal">
            Register
          </Button>
          <Divider horizontal>
            or
          </Divider>
          <SocialLogin login={socialLogin}/>
        </Segment>
      </Form>
    </div>
  );
};

const actions = { register, socialLogin};

export default connect(null, actions)(reduxForm({form: 'registerForm', validate: validator})(RegisterForm));
