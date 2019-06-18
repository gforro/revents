import React from 'react';
import {FormField, Label} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

const DateInput = ({input: {value, onChange, onBlur}, width, placeholder, meta: {touched, error}, ...rest}) => {
  return (
    <FormField error={touched && !!error}>
      <DatePicker {...rest}
                  placeholderText={placeholder}
                  selected={value ? (value.toDate ? value.toDate() : new Date(value)) : null}
                  onChange={onChange}
                  onBlur={(e, value) => onBlur(value)}
                  onChangeRaw={(e) => e.preventDefault()}
      />
      {touched && error && <Label basic color="red">{error}</Label>}
    </FormField>
  );
};

export default DateInput;
