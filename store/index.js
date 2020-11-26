import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from './reducers/rootReducers';

const store = (initState) => {
  return createStore(
    rootReducers,
    initState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

export default store;
