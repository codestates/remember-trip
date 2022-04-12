import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';

export const stateContext = createContext(null);

function Store({ children }) {
  const [isLogIn, setIsLogIn] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [country, setCountry] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [totalDate, setTotalDate] = useState(0);

  const state = {
    isLogIn,
    accessToken,
    country,
    totalCost,
    totalDate,
  };

  const issueCountry = data => {
    setCountry(data);
  };

  const issueAccessToken = token => {
    setAccessToken({
      accessToken: token,
    });
  };

  const loginHandler = (id, password, data) => {
    setIsLogIn(true);
    issueAccessToken(data.accessToken);
  };

  const logoutHandler = () => {
    setIsLogIn(false);
  };

  const totalCostHandler = data => {
    setTotalCost(data);
  };

  const funcs = {
    loginHandler,
    logoutHandler,
    issueCountry,
    totalCostHandler,
  };

  return (
    <stateContext.Provider value={{ state, funcs }}>
      {children}
    </stateContext.Provider>
  );
}

Store.propTypes = {
  children: propTypes.node.isRequired,
};

export default Store;
