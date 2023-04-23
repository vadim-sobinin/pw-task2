import { configureStore } from '@reduxjs/toolkit';
import rowsReducer from './slices/rowsSlice';
import usersReducer from './slices/usersSlice';
import cardsReducer from './slices/cardsSlice';
import commentsReducer from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    cards: cardsReducer,
    users: usersReducer,
    rows: rowsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
