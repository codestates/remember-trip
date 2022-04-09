import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Linktag = styled(NavLink)``;

function Links() {
  return <Linktag>No Account?</Linktag>;
}

export default Links;
