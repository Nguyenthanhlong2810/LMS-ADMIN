import { LOCAL_STORE } from 'consts/system.const';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { connectRouter, routerMiddleware } from 'connected-react-router';
import { useSelector } from 'react-redux';
import allReducers from 'store/reducers/index';
import { createLogger } from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// const history = createBrowserHistory();

/** add middleware */
const middlewares = [];

// middlewares.push(routerMiddleware(history));

// middleware redux-thunk
middlewares.push(thunk);

// middleware redux logger
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    diff: true,
    collapsed: (_getState, _action, logEntry) => !logEntry?.error
  });
  middlewares.push(logger);
}

/** config root reducer */
const allCombineReducers = combineReducers({
  ...allReducers
  // router: connectRouter(history)
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    localStorage.removeItem(LOCAL_STORE.TOKEN);
    state = {};
  }

  return allCombineReducers(state, action);
};

/** config redux-persist */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] // ['authState']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** create redux store */
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(middlewares)
});

const persistor = persistStore(store);

export { store, persistor };

export const useAppSelector = useSelector;
