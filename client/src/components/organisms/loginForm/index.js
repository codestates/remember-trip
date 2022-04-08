import React from 'react';
import styled from 'styled-components';
import InputForm from '../../mocules/inputForm';

const LogInFormBlock = styled.form``;

function LogInForm() {
  return (
    <LogInFormBlock>
      <InputForm></InputForm>
      <InputForm></InputForm>
    </LogInFormBlock>
  );
}

export default LogInForm;
