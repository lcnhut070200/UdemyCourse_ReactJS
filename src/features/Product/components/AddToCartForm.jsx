import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from '../../../components/form-controls/QuantityField/QuantityField';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object({
    quantity: yup
      .number()
      .typeError('Quantity must be a number')
      .required('Please enter quanity')
      .min(1, 'Please enter at least 1'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        style={{ width: '250px' }}
      >
        Add to cart
      </Button>
    </form>
  );
}

export default AddToCartForm;
