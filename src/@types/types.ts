export interface IComment {
  id: string;
  userName: string;
  userId: string;
  body: string;
  parentId: null | string;
  cardId: string;
}

export interface ICard {
  id: string;
  title: string;
  description: string;
  rowId: string;
  userId: string;
}

export interface IRow {
  id: string;
  title: string;
}

export interface IUser {
  id: string;
  name: string;
}
