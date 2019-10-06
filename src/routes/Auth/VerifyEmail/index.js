import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FormWrapper } from '../../../hoc/container';
import Heading from '../../../components/UI/Form/Heading';
import Button from '../../../components/UI/Form/Button';
import Message from '../../../components/UI/Message';
import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -1rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const VerifyEmail = ({ loading, error, reSendVerify, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <FormWrapper>
      <Wrapper>
        <Heading color='white' size='h1'>
          Verify your email
        </Heading>
        <Heading color='white' size='h3' fontWeight={`true`}>
          Go to your email and check verif your email
        </Heading>
        <Button
          loading={loading ? 'Sending email...' : null}
          disabled={loading}
          onClick={() => reSendVerify()}
        >
          Re-send verify email
        </Button>
        <MessageWrapper>
          <Message error show={error}>
            {error}
          </Message>
        </MessageWrapper>
        <MessageWrapper>
          <Message success show={error === false}>
            Message sent successfully!
          </Message>
        </MessageWrapper>
      </Wrapper>
    </FormWrapper>
  );
};

VerifyEmail.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  reSendVerify: PropTypes.func.isRequired,
  cleanUp: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: state.auth.verifyEmail.loading,
  error: state.auth.verifyEmail.error,
});

const mapDispatchToProps = {
  reSendVerify: actions.verifyEmail,
  cleanUp: actions.cleanUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyEmail);
