import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { StyledForm } from '../../../hoc/container';
import Input from '../../../components/UI/Form/Input';
import Button from '../../../components/UI/Form/Button';
import Message from '../../../components/UI/Message';

const schemaTodo = Yup.object().shape({
  todo: Yup.string().required('Todo is required!'),
});

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -1rem;
`;

const AddTodo = () => {
  return (
    <Formik
      initialValues={{
        todo: '',
      }}
      validationSchema={schemaTodo}
      onSubmit={async (value, { setSubmitting }) => {
        // await login(value);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <StyledForm>
          <Field
            type='text'
            name='todo'
            placeholder='Write your todo...'
            component={Input}
          />
          <Button
            disabled={!isValid || isSubmitting}
            type='submit'
            // loading={loading ? 'Adding...' : null}
          >
            Add todo
          </Button>
          {/* <MessageWrapper>
            <Message error show={error}>
              {error}
            </Message>
          </MessageWrapper> */}
        </StyledForm>
      )}
    </Formik>
  );
};

export default AddTodo;
