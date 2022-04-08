import React from 'react';
import styled from 'styled-components';

const Label = styled.label``;

const span = ({ className, children }) => {
  return <Label className={className}>{children}</Label>;
};

export default span;
