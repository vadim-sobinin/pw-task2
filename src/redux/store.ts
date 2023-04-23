import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rowsReducer from './slices/rowsSlice';
import usersReducer from './slices/usersSlice';
import cardsReducer from './slices/cardsSlice';
import commentsReducer from './slices/commentsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  comments: commentsReducer,
  cards: cardsReducer,
  users: usersReducer,
  rows: rowsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
