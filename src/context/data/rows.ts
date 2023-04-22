import { IRow } from '../../@types/types';

const initialData: IRow[] = [
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

const value = localStorage.getItem('rowsData');

export const rowsData: IRow[] = typeof value === 'string' ? JSON.parse(value) : initialData;
