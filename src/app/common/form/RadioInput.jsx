import React from 'react';
import {FormField} from 'semantic-ui-react';

const RadioInput = ({input, width, type, label}) => {
  return (
    <FormField>
      <div className="ui radio">
        <input {...input} type={type}/>{' '}
        <label>{label}</label>
      </div>
    </FormField>
  );
};

export default RadioInput;
