import propTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const InputTag = styled.input``;

function Input({ className, children, placeholder }) {
  return (
    <InputTag
      className={className}
      onChange={e => e.target.value}
      placeholder={placeholder}
      type={children}
    />
  );
}

Input.propTypes = {
  className: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
};

export default Input;
