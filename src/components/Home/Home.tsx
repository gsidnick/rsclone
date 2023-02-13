import React from 'react';
import Button from '../UI/Button/Button';
import './Home.css';

function Home() {
  return (
    <main className="home">
      <div className="home__container container">
        <div className="home__greeting">
          <h1 className="home__greeting-text">Hey, friend, let's start our journey!</h1>
          <span className="home__greeting-description">
            Discover new opportunities for communication, career and travel
          </span>
          <div className="home__group-controls">
            <Button className="home__game-play" to="/login">
              Log In
            </Button>
            <Button className="home__game-play button_outline" to="/signup">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
