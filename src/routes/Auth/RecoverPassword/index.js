import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FormWrapper, StyledForm } from '../../../hoc/container';
import Input from '../../../components/UI/Form/Input';
import Button from '../../../components/UI/Form/Button';
import Message from '../../../components/UI/Message';
import Heading from '../../../components/UI/Form/Heading';

import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
`;

const schemaResetPassword = Yup.object().shape({
  email: Yup.string()
    .required('The email is required')
    .email('Invalid email'),
});

const RecoverPassword = ({ loading, error, cleanUp, sendEmail }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={schemaResetPassword}
      onSubmit={async (value, { setSubmitting }) => {
        await sendEmail(value);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading size='h1' color='white' noMargin>
            Reset your password
          </Heading>
          <Heading size='h4' fontWeight={`true`} color='white'>
            Type your email to reset your password
          </Heading>
          <StyledForm>
            <Field
              type='email'
              name='email'
              placeholder='Your email...'
              component={Input}
            />
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? 'Resetting...' : null}
              type='submit'
            >
              Recover password
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
            <MessageWrapper>
              <Message success show={error === false}>
                PLease check your email!
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

RecoverPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  sendEmail: PropTypes.func.isRequired,
  cleanUp: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: state.auth.recoverPassword.loading,
  error: state.auth.recoverPassword.error,
});

const mapDispatchToProps = {
  sendEmail: actions.recoverPassword,
  cleanUp: actions.cleanUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecoverPassword);
