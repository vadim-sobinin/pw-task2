import { IUser } from '../../@types/types';

const initialData: IUser[] = [];

const value = localStorage.getItem('usersData');

export const usersData: IUser[] = typeof value === 'string' ? JSON.parse(value) : initialData;
