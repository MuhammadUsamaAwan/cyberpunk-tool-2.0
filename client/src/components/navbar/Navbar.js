import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <Link exact to='/'>
          Cyberpunk Tool
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/planner'>Planner</Link>
        </li>
        <li>
          <Link to='/builds'>Builds</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
