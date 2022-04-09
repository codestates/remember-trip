import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const ButtonTag = styled.button`
  background-color: rgb(93, 176, 198, 0.645);
  border: solid 2px;
  border-bottom-width: 5px;
  border-color: #2c303da8;
  border-radius: 20px;
  font-size: 40px;
  font-weight: bolder;
  :active {
    box-shadow: 1px 1px 0 #2c303da8;
    border: solid 0.5px;
  }
  :hover {
    background-color: rgb(93, 176, 198);
  }
`;

function Button({ onClick, type }) {
  return <ButtonTag onClick={onClick} type={type} />;
}

Button.propTypes = {
  onClick: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
};

export default Button;
