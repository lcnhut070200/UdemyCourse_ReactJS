import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
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

  const hasError = !!formState.errors[name];

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          disabled={disabled}
          error={hasError}
          helperText={formState.errors[name]?.message}
          margin="normal"
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
}

export default InputField;
