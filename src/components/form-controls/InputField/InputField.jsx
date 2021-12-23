import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { formState } = form;

  const hasError = formState.errors[name] && formState.touchedFields[name];
  // console.log(formState.errors[name], formState.touchedFields[name]);

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <TextField
          fullWidth
          {...field}
          label={label}
          disabled={disabled}
          error={hasError}
          helperText={formState.errors[name]?.message}
          margin="normal"
        />
      )}
    />
  );
}

export default InputField;
