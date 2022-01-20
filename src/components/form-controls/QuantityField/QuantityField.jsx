import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, label, name, disabled } = props;

  const { formState, setValue } = form;
  const hasError = !!formState.errors[name];

  return (
    <FormControl fullWidth margin="normal" variant="outlined" error={hasError} size="small">
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        id={name}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
              }
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <OutlinedInput
              type="number"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              disabled={disabled}
            />
            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
              }
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText>{formState.errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
