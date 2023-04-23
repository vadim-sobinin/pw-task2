import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IRow } from '../../@types/types';

const initialState: IRow[] = [
  {
    id: '0',
    title: 'TO DO',
  },
  {
    id: '1',
    title: 'In Progress',
  },
  {
    id: '2',
    title: 'Testing',
  },
  {
    id: '3',
    title: 'Done',
  },
];

export const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    renameRow: (state, { payload }: PayloadAction<{ rowId: string; newTitle: string }>) => {
      state = state.map((row) => {
        if (payload.rowId === row.id) {
          row.title = payload.newTitle;
        }
        return row;
      });
    },
  },
});

export const { renameRow } = rowsSlice.actions;

export default rowsSlice.reducer;
