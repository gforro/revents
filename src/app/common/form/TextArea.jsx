import React from 'react';
import {FormField, Label} from 'semantic-ui-react';

const TextArea = ({input, type, width, placeholder, rows, meta: {touched, error}}) => {
  return (
    <FormField error={touched && !!error}>
      <textarea {...input} placeholder={placeholder} type={type} rows={rows} />
      {touched && error && <Label basic color="red">{error}</Label>}
    </FormField>
  );
};

export default TextArea;
