import React from 'react';
import styled from 'styled-components';

const Text = styled.span``;

const span = ({ className, children }) => {
  return <Text className={className}>{children}</Text>;
};

export default span;
