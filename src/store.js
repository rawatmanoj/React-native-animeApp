import { createStore, compose } from 'redux';
//import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers/rootReducer';
import { reactotron } from '../reactotron.config';

const middlewares = [];

if (__DEV__) { // Check if it's development mode
    const reactotronMiddleware = reactotron.createEnhancer();
    // Creating Reactotron "data capturer"
    middlewares.push(reactotronMiddleware);
    // And pushing it to the middlewares array
}

const store = createStore(rootReducer, compose(...middlewares));

export default store;
