import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

const moment = require('moment');

export const stateContext = createContext(null);

function Store({ children }) {
  const [isLogIn, setIsLogIn] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [country, setCountry] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);

  const state = {
    isLogIn,
    accessToken,
    country,
    totalCost,
    start_date,
    end_date,
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
    issueAccessToken('');
  };

  const totalCostHandler = data => {
    setTotalCost(data);
  };

  const startDateHandler = data => {
    setStartDate(moment(data).format('YYYY/MM/DD'));
  };

  const endDateHandler = data => {
    setEndDate(moment(data).format('YYYY/MM/DD'));
  };

  const startTrip = () => {
    axios.post('https://localhost:8080/mypage/trip', {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      country,
      totalCost,
      start_date,
      end_date,
    });
  };

  const tripInFoRequest = () => {
    axios.get('https://localhost:8080/mypage/trip', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  };

  const funcs = {
    loginHandler,
    logoutHandler,
    issueCountry,
    totalCostHandler,
    tripInFoRequest,
    startTrip,
    startDateHandler,
    endDateHandler,
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
