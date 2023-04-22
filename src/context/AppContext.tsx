import React from 'react';
import { ICard, IComment, IRow, IUser } from '../@types/types';
import { cardsData } from './data/cards';
import { commentsData } from './data/comments';
import { rowsData } from './data/rows';
import { usersData } from './data/users';

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContext = React.createContext<ContextType | null>(null);

interface ContextType {
  rows: IRow[];
  setRows: React.Dispatch<React.SetStateAction<IRow[]>>;
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  currentUser: IUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
  updateCardName: (cardId: string, newName: string) => void;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [rows, setRows] = React.useState(rowsData);
  const [cards, setCards] = React.useState(cardsData);
  const [comments, setComments] = React.useState(commentsData);
  const [users, setUsers] = React.useState(usersData);
  const [currentUser, setCurrentUser] = React.useState<IUser>({ id: '-1', name: 'InitialValue' });

  React.useEffect(() => {
    localStorage.setItem('rowsData', JSON.stringify(rows));
  }, [rows]);
  React.useEffect(() => {
    localStorage.setItem('cardsData', JSON.stringify(cards));
  }, [cards]);
  React.useEffect(() => {
    localStorage.setItem('commentsData', JSON.stringify(comments));
  }, [comments]);
  React.useEffect(() => {
    localStorage.setItem('usersData', JSON.stringify(users));
  }, [users]);

  const updateCardName = (cardId: string, newName: string) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          card.title = newName;
        }
        return card;
      }),
    );
  };

  return (
    <AppContext.Provider
      value={{
        rows,
        setRows,
        cards,
        setCards,
        comments,
        setComments,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        updateCardName,
      }}>
      {children}
    </AppContext.Provider>
  );
};
