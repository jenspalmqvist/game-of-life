import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import root from './root';

export default () => {
  const store = createStore(root.appReducer, composeWithDevTools(applyMiddleware()));
  return store;
};
