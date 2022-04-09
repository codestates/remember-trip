import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import InputForm from '../../mocules/inputForm';

const LogInFormBlock = styled.form``;

function LogInForm({ inputHandler }) {
  return (
    <LogInFormBlock>
      <InputForm
        labelId="ID"
        type="text"
        placeholder="email"
        inputHandler={inputHandler}
      />
      <InputForm
        labelId="PW"
        type="password"
        placeholder="password"
        inputHandler={inputHandler}
      />
    </LogInFormBlock>
  );
}

LogInForm.propTypes = {
  inputHandler: propTypes.func.isRequired,
};

export default LogInForm;
