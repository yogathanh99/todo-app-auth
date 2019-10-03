import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { FormWrapper, StyledForm } from '../../../hoc/container';
import Message from '../../../components/UI/Message';
import Button from '../../../components/UI/Form/Button';
import Input from '../../../components/UI/Form/Input';
import Heading from '../../../components/UI/Form/Heading';

import * as actions from '../../../store/actions';

const schemaProfile = Yup.object().shape({
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
  password: Yup.string().min(8, 'Password must have min 8 characters'),
  confirmPassword: Yup.string().when('password', {
    is: pass => pass.length > 0,
    then: Yup.string()
      .required('You need to confirm your password.')
      .oneOf([Yup.ref('password'), null], `Password doesn't match`),
  }),
});

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
`;

const Profile = ({ firebase, loading, error, cleanUp, editProfile }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  if (!firebase.profile.isLoaded) return null;

  return (
    <Formik
      initialValues={{
        firstName: firebase.profile.firstName,
        lastName: firebase.profile.lastName,
        email: firebase.auth.email,
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schemaProfile}
      onSubmit={async (value, { setSubmitting }) => {
        await editProfile(value);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size='h1' color='white'>
            Edit your profile
          </Heading>
          <Heading size='h4' color='white' fontWeight={'true'}>
            You can edit your profile here
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
              loading={loading ? 'Editing...' : null}
              type='submit'
            >
              Edit
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
            <MessageWrapper>
              <Message success show={error === false}>
                Your profile is updated successful!
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  firebase: state.firebase,
  loading: state.auth.profileEdit.loading,
  error: state.auth.profileEdit.error,
});

const mapDispatchToProps = {
  cleanUp: actions.cleanUp,
  editProfile: actions.editProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
