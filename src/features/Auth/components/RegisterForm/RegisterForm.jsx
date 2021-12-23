import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField/InputField';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object({
    title: yup.string().required('Please enter title').min(5, 'Title is at least 5 characters'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    // console.log('Todo form: ', values);
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <div>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h3" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <InputField name="password" label="Password" form={form} />
        <InputField name="retypePassword" label="Retype Password" form={form} />
      </form>
    </div>
  );
}

export default RegisterForm;
