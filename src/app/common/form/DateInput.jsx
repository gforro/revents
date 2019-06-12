import React from 'react';
import {FormField, Label} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

const DateInput = ({input, width, placeholder, meta: {touched, error}, ...rest}) => {
  return (
    <FormField error={touched && !!error}>
      <DatePicker {...rest}
                  placeholderText={placeholder}
                  selected={input.value ? new Date(input.value) : null}
                  onChange={input.onChange}
                  onBlur={input.onBlur}
                  onChangeRaw={(e) => e.preventDefault()}
      />
      {touched && error && <Label basic color="red">{error}</Label>}
    </FormField>
  );
};

export default DateInput;
