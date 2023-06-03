import { LOCAL_STORE } from 'consts/system.const';

import React, { useCallback, useContext } from 'react';

import { HTTP_STATUS } from 'consts/status.const';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ErrorContext = React.createContext({
  addError: () => ({})
});

/**
 * Hook handle error globally
 * @example
 * const {addError} = useError();
 * addError({ message: 'abc', status: RESPONSE_STATUS.NOT_FOUND }, 'This is error');
 */
function useError() {
  const { addError } = useContext(ErrorContext);
  return { addError };
}

function ErrorProvider(props) {
  const navigate = useNavigate();

  const addError = async (error, message) => {
    if (error.status === HTTP_STATUS.StatusNotFound)
      toast.error(error?.message ?? message ?? 'Error 404');

    if (error.status === HTTP_STATUS.StatusForbidden) {
      localStorage.removeItem(LOCAL_STORE.TOKEN);
      navigate('/login', { replace: true });
    }

    if (error.status === HTTP_STATUS.StatusInternalServerError) {
      // const error = await error.json();
      // toast.error(error?.message || message || '');
      toast.error(error?.message ?? message ?? 'Error 500');
    }
  };

  const contextValue = {
    addError: useCallback((err, message) => addError(err, message), [])
  };

  return <ErrorContext.Provider value={contextValue}>{props.children}</ErrorContext.Provider>;
}

ErrorProvider.propTypes = {
  children: PropTypes.any
};

export { useError, ErrorProvider };
