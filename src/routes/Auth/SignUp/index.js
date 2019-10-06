import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { FormWrapper, StyledForm } from '../../../hoc/container';
import Input from '../../../components/UI/Form/Input';
import Button from '../../../components/UI/Form/Button';
import Heading from '../../../components/UI/Form/Heading';
import Message from '../../../components/UI/Message';

import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
`;

const schemaSignUp = Yup.object().shape({
  firstName: Yup.string()
    .required('Your first name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too long.'),
  lastName: Yup.string()
    .required('Your last name is required.')
    .max(25, 'Too long.'),
  email: Yup.string()
    .required('The email is required')
    .email('Invalid email'),
  password: Yup.string()
    .required('The email is required')
    .min(8, 'Password must have min 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Password doesn't match`)
    .required('You need to confirm your password.'),
});

const SignUp = ({ signUp, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schemaSignUp}
      onSubmit={async (value, { setSubmitting }) => {
        await signUp(value);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size='h1' color='white'>
            Sign up here...
          </Heading>
          <Heading size='h4' color='white' fontWeight={'true'}>
            Fill in your details to register your new account
          </Heading>
          <StyledForm>
            <Field
              type='text'
              name='firstName'
              placeholder='Your first name...'
              component={Input}
            />
            <Field
              type='text'
              name='lastName'
              placeholder='Your last name...'
              component={Input}
            />
            <Field
              type='email'
              name='email'
              placeholder='Your email...'
              component={Input}
            />
            <Field
              type='password'
              name='password'
              placeholder='Your password...'
              component={Input}
            />
            <Field
              type='password'
              name='confirmPassword'
              placeholder='Re-type your password...'
              component={Input}
            />
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? 'Signing up...' : null}
              type='submit'
            >
              Sign Up
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

SignUp.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  signUp: PropTypes.func.isRequired,
  cleanUp: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = {
  signUp: actions.signUp,
  cleanUp: actions.cleanUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
