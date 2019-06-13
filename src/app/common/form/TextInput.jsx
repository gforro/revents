import React from 'react';
import {FormField, Label} from 'semantic-ui-react';

const TextInput = ({input, type, width, placeholder, meta: {touched, error}}) => {
  return (
    <FormField error={touched && !!error}>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && <Label basic color="red">{error}</Label>}
    </FormField>
  );
};

export default TextInput;
