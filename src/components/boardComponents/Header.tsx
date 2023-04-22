import React from 'react';
import styled from 'styled-components';
import { Flex } from '../styleWrappers/Flex';
import logoutIcon from '../../assets/img/svg/logout.svg';

const StyledButton = styled.button`
  width: 41px;
  height: 41px;
  background: #4e97c2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 1;
  transition: scale 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledTitle = styled.h1`
  display: inline-block;
  margin: 0;
  color: #fff;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
`;

interface HeaderProps {
  onClickLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClickLogout }) => {
  return (
    <Flex gap="10px" margin="8px 18px" align="center">
      <StyledTitle>Main Board</StyledTitle>
      <StyledButton onClick={onClickLogout}>
        <Flex align="center" justify="center">
          <img src={logoutIcon} alt="logout" width={24} height={24} />
        </Flex>
      </StyledButton>
    </Flex>
  );
};
