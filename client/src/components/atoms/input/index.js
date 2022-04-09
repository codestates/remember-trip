import propTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const InputTag = styled.input``;

function Input({ type, placeholder, inputHandler }) {
  return (
    <InputTag onChange={inputHandler} placeholder={placeholder} type={type} />
  );
}

Input.propTypes = {
  type: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  inputHandler: propTypes.func.isRequired,
};

export default Input;
