import propTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const TitleName = styled.h1``;

function Title({ title }) {
  return <TitleName>{title}</TitleName>;
}

Title.propTypes = {
  title: propTypes.string.isRequired,
};

export default Title;
