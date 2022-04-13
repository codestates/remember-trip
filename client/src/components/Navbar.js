import React from 'react';

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <div className="Navbar_1">
        <Link style={{ textDecoration: 'none' }} to="/">
          Home
        </Link>
      </div>
      <div className="Navbar_2">
        <Link style={{ textDecoration: 'none' }} to="/diary">
          Diary
        </Link>
      </div>
      <div className="Navbar_3">
        <Link style={{ textDecoration: 'none' }} to="/mypage">
          Mypage
        </Link>
      </div>
      <div className="Navbar_4">
        <Link style={{ textDecoration: 'none' }} to="/account">
          Account
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
