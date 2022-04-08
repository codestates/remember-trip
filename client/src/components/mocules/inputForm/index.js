import propTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Input from '../../atoms/input';
import Label from '../../atoms/label';

const InputFormBlock = styled.div``;

function InputForm({ className }) {
  return (
    <InputFormBlock className={className}>
      <Label>
        <Input></Input>
      </Label>
    </InputFormBlock>
  );
}

InputForm.propTypes = {
  className: propTypes.string.isRequired,
};

export default InputForm;
