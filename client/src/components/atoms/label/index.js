import propTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const LabelTag = styled.label``;

function Label({ children }) {
  return <LabelTag>{children}</LabelTag>;
}

Label.propTypes = {
  children: propTypes.string.isRequired,
};
export default Label;
