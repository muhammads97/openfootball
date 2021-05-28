import React from 'react';

import {Provider} from 'react-redux';
import store from './app/redux/store/store';
import Root from './app/index';
// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
