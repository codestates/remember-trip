import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/input';
import Label from '../../atoms/label';

const InputFormBlock = styled.div``;

function InputForm({ labelId, type, placeholder, inputHandler }) {
  return (
    <InputFormBlock>
      <Label>
        {labelId}
        <Input
          type={type}
          placeholder={placeholder}
          inputHandler={inputHandler}
        />
      </Label>
    </InputFormBlock>
  );
}

InputForm.propTypes = {
  labelId: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  inputHandler: propTypes.func.isRequired,
};

export default InputForm;
