import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../src';

const App = () => (
  <div>
    <h1>Testing Button Component</h1>
    <Button onClick={() => {}}>Click Me!!!</Button>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
