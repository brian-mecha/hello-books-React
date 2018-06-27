import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Button } from 'reactstrap';

export default (props) => {
    return (
      <Button color="danger">Danger!</Button>
    );
  };

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
