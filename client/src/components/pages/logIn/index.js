import React from 'react';
import inputHandler from '../../../utils';
import Button from '../../atoms/btn';
import Title from '../../atoms/title';
import LogInForm from '../../organisms/loginForm';

function LogInPage() {
  return (
    <>
      <Title title="Remember Trip" />
      <LogInForm inputHandler={inputHandler} />
      <Button />
      <Button />
    </>
  );
}

export default LogInPage;
