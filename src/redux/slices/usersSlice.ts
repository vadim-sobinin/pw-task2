import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../@types/types';

type initialStateType = {
  users: IUser[];
  currentUser: IUser;
};

const initialState: initialStateType = {
  users: [],
  currentUser: { id: '-1', name: 'Initial User' },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<string>) => {
      const findUser = state.users.find((user) => user.name === payload);
      if (findUser) {
        state.currentUser = findUser;
      } else {
        const newUser = { id: String(state.users.length), name: payload };
        state.currentUser = newUser;
        state.users.push(newUser);
      }
    },
  },
});

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
