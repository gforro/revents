import React from 'react';
import {Button, Divider, Form, Header, Label, Segment} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from '../../../app/common/form/RadioInput';
import {addYears} from 'date-fns';

const BasicPage = ({ pristine, submitting, handleSubmit, updateProfile, invalid, error} ) => {
    return (
      <Segment>
        <Header dividing size='large' content='Basics' />
        <Form onSubmit={handleSubmit(updateProfile)} error>
          <Field
            width={8}
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Known As'
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field name="gender" type="radio" value="male" label="Male" component={RadioInput} />
            <Field name="gender" type="radio" value="female" label="Female" component={RadioInput} />
          </Form.Group>
          <Field
            width={8}
            name='dateOfBirth'
            component={DateInput}
            placeholder='Date of Birth'
            dateFormat='dd LLL yyyy'
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
            maxDate={addYears(new Date(), -18)}
          />
          <Field
            name='city'
            placeholder='Home Town'
            options={{types: ['(cities)']}}
            label='Female'
            component={PlaceInput}
            width={8}
          />
          {error && <Label color="red">error</Label>}
          <Divider/>
          <Button disabled={pristine || submitting || invalid} size='large' positive content='Update Profile'/>
        </Form>
      </Segment>
    );
  }

export default reduxForm({form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false})(BasicPage);
