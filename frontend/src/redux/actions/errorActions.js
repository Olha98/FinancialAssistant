import errorConstants from '../constants/errorConstants';

const setError = error => {
  return {
    type: errorConstants.SET_ERROR,
    payload: error,
  };
};

const hideError = () => {
  return {
    type: errorConstants.HIDE_ERROR,
  };
};

export default { setError, hideError };