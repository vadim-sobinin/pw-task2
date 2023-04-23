import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../@types/types';

const initialState: ICard[] = [];

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, { payload }: PayloadAction<{ rowId: string; userId: string }>) => {
      const newCard: ICard = {
        id: Date.now().toString(),
        title: 'New card',
        description: '',
        rowId: payload.rowId,
        userId: payload.userId,
      };
      state.push(newCard);
    },
    updateCardName: (state, { payload }: PayloadAction<{ cardId: string; newName: string }>) => {
      state = state.map((card) => {
        if (card.id === payload.cardId) {
          card.title = payload.newName;
        }
        return card;
      });
    },
    deleteCard: (state, { payload }: PayloadAction<ICard>) => {
      const index = state.findIndex((card) => card.id === payload.id);
      state.splice(index, 1);
    },
  },
});

export const { addCard, updateCardName, deleteCard } = cardsSlice.actions;

export default cardsSlice.reducer;
