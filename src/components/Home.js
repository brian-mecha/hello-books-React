import React from 'react';
import Header from './Header';
import Books from './templates/Books';
import Menus from './Menus';

// Homepage
class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <Menus/>
        <Books/>
      </div>
    );
  }
}

export default Home;
