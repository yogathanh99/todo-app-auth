import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FormWrapper, StyledForm } from '../../../hoc/container';
import Input from '../../../components/UI/Form/Input';
import Button from '../../../components/UI/Form/Button';
import Heading from '../../../components/UI/Form/Heading';
import Message from '../../../components/UI/Message';

const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .required('The email is required')
    .email('Invalid email'),
  password: Yup.string()
    .required('The password is required')
    .min(8, 'Password must have min 8 characters'),
});

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
`;

const ForgotWrapper = styled.div`
  margin-top: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-white);
`;

const Login = ({ loading, error, login, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schemaLogin}
      onSubmit={async (value, { setSubmitting }) => {
        await login(value);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size='h1' color='white'>
            Login here...
          </Heading>
          <Heading size='h4' color='white' fontWeight={'true'}>
            Fill in your account
          </Heading>
          <StyledForm>
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
            <Button
              disabled={!isValid || isSubmitting}
              type='submit'
              loading={loading ? 'Logging in...' : null}
            >
              Login
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
            <ForgotWrapper>
              <Heading size='h4' fontWeight={`true`} color='white' noMargin>
                <StyledNavLink to='/recover'>
                  Forgot your password?
                </StyledNavLink>
              </Heading>
            </ForgotWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  login: PropTypes.func.isRequired,
  cleanUp: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = {
  login: actions.logIn,
  cleanUp: actions.cleanUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
