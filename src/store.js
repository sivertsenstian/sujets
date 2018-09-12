import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import { promiseMiddleware } from "./middleware";
import reducers from "./reducers";

export const history = createHistory(),
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(routerMiddleware(history), promiseMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      routerMiddleware(history),
      promiseMiddleware,
      createLogger({
        predicate: (getState, action) => action.error || action.log
      })
    );
  }
};

export const store = createStore(reducers, composeEnhancers(getMiddleware()));
