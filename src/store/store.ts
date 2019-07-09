import { Store, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import { PersistConfig } from "redux-persist/es/types";
import createSagaMiddleware from 'redux-saga';
import localForage from "localforage";

import { AppState, rootReducers } from "./rootReducers";
import rootSagas from "./rootSagas";

const persistConfig: PersistConfig = {
  key: 'gas',
  storage: localForage,
  blacklist: ['config']
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();

const store: Store<AppState> = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSagas);

const persistor = persistStore(store);

export { store, persistor };
