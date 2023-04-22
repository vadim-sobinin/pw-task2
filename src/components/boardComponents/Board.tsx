import React from 'react';
import { ICard, IUser } from '../../@types/types';
import { AppContext } from '../../context/AppContext';
import { Header } from './Header';
import { Main } from './Main';

export const Board: React.FC = () => {
  const context = React.useContext(AppContext);

  React.useEffect(() => {
    login();
  }, []);

  const login = () => {
    let username = window.prompt('Please write your name: ');
    while (!username) {
      username = window.prompt('Please write your name: ');
    }

    const findUser = context?.users.find((user) => user.name === username);
    if (findUser) {
      context?.setCurrentUser(findUser);
    } else if (username) {
      const newUser: IUser = {
        id: String(context?.users.length),
        name: username,
      };
      context?.setCurrentUser(newUser);
      context?.setUsers([...context.users, newUser]);
    }
  };

  const onClickLogout = () => {
    if (window.confirm('Are you sure that you want to logout?')) login();
  };

  return (
    <main>
      <Header onClickLogout={onClickLogout} />
      <Main />
    </main>
  );
};
