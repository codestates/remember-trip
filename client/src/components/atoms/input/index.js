import React from 'react';
import styled from 'styled-components';

const Input = styled.input``;

const input = ({ className, children }) => {
  return (
    <Input
      className={className}
      onChange={e => e.target.value}
      placeholder={children}
      type={children}
    />
  );
};

export default input;
