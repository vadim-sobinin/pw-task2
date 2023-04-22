import { ICard } from '../../@types/types';

const initialData: ICard[] = [];

const value = localStorage.getItem('cardsData');

export const cardsData: ICard[] = typeof value === 'string' ? JSON.parse(value) : initialData;
