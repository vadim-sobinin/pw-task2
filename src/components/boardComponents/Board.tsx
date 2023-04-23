import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { useAppDispatch } from '../../hooks/hook';
import { setCurrentUser } from '../../redux/slices/usersSlice';

export const Board: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    login();
  }, []);

  const login = () => {
    let username = window.prompt('Please write your name: ');
    while (!username) {
      username = window.prompt('Please write your name: ');
    }

    dispatch(setCurrentUser(username));
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
