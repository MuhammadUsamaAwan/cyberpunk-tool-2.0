import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const Features = () => (
  <div className='flex-container'>
    <ScrollAnimation
      animateIn='fadeIn'
      animateOnce={true}
      className='flex-item'
    >
      <i className='fa fa-floppy-o fa-2x primary' />
      <h3 className='primary'>Save Your Builds & Share With Others</h3>
      <p>
        Save your build as private or share with your friend and community to
        get upvotes and feedback.
      </p>
    </ScrollAnimation>
    <ScrollAnimation
      animateIn='fadeIn'
      animateOnce={true}
      delay={500}
      className='flex-item'
    >
      <i className='fa fa-pencil fa-2x primary' />
      <h3 className='primary'>Plan Your Characters</h3>
      <p>
        Create a perfect min-max character for Cyperpunk 2077 using our build
        creator and view your AR, defense rating among other active effects.
      </p>
    </ScrollAnimation>
    <ScrollAnimation
      animateIn='fadeIn'
      delay={1000}
      animateOnce={true}
      className='flex-item'
    >
      <i className='fa fa-book fa-2x primary' />
      <h3 className='primary'>Browse Other Builds</h3>
      <p>
        Browse builds made by other people. Upvote to add it to your favorites.
        Comment to get more insight.
      </p>
    </ScrollAnimation>
  </div>
);

export default Features;
