import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavTag = styled.nav``;

function Navbar({ className }) {
  return (
    <NavTag className={className}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/diary">Diary</Link>
      </li>
      <li>
        <Link to="/mypage">Mypage</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
    </NavTag>
  );
}

Navbar.propTypes = {
  className: propTypes.string.isRequired,
};
export default Navbar;
