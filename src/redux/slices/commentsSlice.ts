import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../../@types/types';

const initialState: IComment[] = [];

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, { payload }: PayloadAction<IComment>) => {
      state.push(payload);
    },

    editComment: (state, { payload }: PayloadAction<{ commentId: string; newBody: string }>) => {
      state = state.map((comment) => {
        if (comment.id === payload.commentId) {
          comment.body = payload.newBody;
        }
        return comment;
      });
    },
    removeComment: (state, { payload }: PayloadAction<string>) => {
      const index = state.findIndex((comment) => comment.id === payload);
      state.splice(index, 1);
    },
  },
});

export const { addNewComment, editComment, removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
