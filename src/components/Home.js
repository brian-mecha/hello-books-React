import React from 'react';
import Header from './Header';
import Books from './templates/Books';
import Menus from './Menus';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Menus/>
                <Header/>
                <Books/>
            </div>
        )
    }
}

export default Home