import React from 'react';
import ReactDOM from 'react-dom';
import Cabinet from './Cabinet';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cabinet />, div);
  ReactDOM.unmountComponentAtNode(div);
});
