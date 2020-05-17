import React from 'react';

const Home = () => (
  <section className='landing'>
    <div className='dark-overlay'>
      <div className='landing-inner'>
        <h1 className='x-large'>Cyperpunk Tool</h1>
        <p className='lead'>
          Craft a perfectly min-maxed character. Save your builds and share them
          with others or browse other people's submitted builds.
        </p>
        <div className='buttons'>
          <div className='btn btn-primary'>Craft Build</div>
          <div className='btn btn-light'>Browse Builds</div>
        </div>
      </div>
    </div>
  </section>
);

export default Home;
