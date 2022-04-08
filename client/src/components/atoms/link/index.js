import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Linklist = styled(Link)``;

const link = () => {
  return (
    <li>
      <Linklist to="/">Home</Linklist>
    </li>
  );
};

export default link;
