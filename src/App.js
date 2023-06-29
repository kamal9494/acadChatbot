import './App.css';
// import Navbar from './components/Navbar';
import Room from './components/Room';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Amplify } from 'aws-amplify';

const botName = process.env.REACT_APP_BOT_NAME;
Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION
  },
  Interactions: {
    bots: {
      [botName]: {
        name: botName,
        alias: '$LATEST',
        region: process.env.REACT_APP_REGION
      }
    }
  }
});


const App = () => {
  return (
    <React.StrictMode>
    <Room />
    </React.StrictMode>
  )
};

export default App;
