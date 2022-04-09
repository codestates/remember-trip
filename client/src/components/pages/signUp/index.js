import React from 'react';
import Button from '../../atoms/btn';
import Title from '../../atoms/title';
import InputForm from '../../mocules/inputForm';
import LogInForm from '../../organisms/loginForm';
import inputHandler from '../../../utils';

function SignUpPage() {
  return (
    <>
      <Title title="Sign Up" />
      <LogInForm inputHandler={inputHandler} />
      <InputForm
        labelId="check-pw"
        type="password"
        placeholder="check-pw"
        inputHandler={inputHandler}
      />
      <Button />
    </>
  );
}

export default SignUpPage;
