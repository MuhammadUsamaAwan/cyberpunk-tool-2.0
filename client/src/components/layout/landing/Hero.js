import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className='landing'>
    <div className='dark-overlay'>
      <div className='landing-inner'>
        <h1 className='x-large'>Cyperpunk Tool</h1>
        <p className='lead'>
          Craft a perfectly min-maxed character. Save your builds and share them
          with others or browse other people's submitted builds.
        </p>
        <div className='buttons'>
          <Link to='/planner' className='btn btn-primary'>
            Craft Build
          </Link>
          <Link to='/builds' className='btn btn-light'>
            Browse Builds
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
