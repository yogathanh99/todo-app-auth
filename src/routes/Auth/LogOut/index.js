import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../store/actions';

const LogOut = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);
  return null;
};

LogOut.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logout: actions.logOut,
};

export default connect(
  null,
  mapDispatchToProps,
)(LogOut);
