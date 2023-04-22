import { IComment } from '../../@types/types';

const initialData: IComment[] = [];

const value = localStorage.getItem('commentsData');

export const commentsData: IComment[] = typeof value === 'string' ? JSON.parse(value) : initialData;
