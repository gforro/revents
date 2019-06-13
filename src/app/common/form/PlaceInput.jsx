import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {FormField, Label, List, ListDescription, ListHeader, ListItem, Segment} from 'semantic-ui-react';

const PlaceInput = ({
                      input: {value, onChange, onBlur},
                      width,
                      placeholder,
                      options,
                      onSelect,
                      meta: {touched, error}
}) => {
  return (
    <PlacesAutocomplete value={value} onChange={onChange} searchOptions={options} onSelect={onSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={touched && !!error}>
          <input {...getInputProps({placeholder, onBlur})} />
          {touched && error && <Label basic color="red">{error}</Label>}
          {suggestions.length > 0 && (
            <Segment style={{position: 'absolute', zIndex: 100, width: '100%', marginTop: 0}}>
              {loading && <div>Loading...</div>}
              <List selection>
                {suggestions.map(suggestion => (
                  <ListItem {...getSuggestionItemProps(suggestion)}>
                    <ListHeader>{suggestion.formattedSuggestion.mainText}</ListHeader>
                    <ListDescription>{suggestion.formattedSuggestion.secondaryText}</ListDescription>
                  </ListItem>
                ))}

              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceInput;
