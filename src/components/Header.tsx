import React from 'react';
import styled from 'styled-components';
import { Flex } from './styleWrappers/Flex';
import logo from '../assets/img/svg/logo.svg';

const StyledHeader = styled.header`
  height: 49px;
  color: #80b4d3;
  background: #026aa7;
  font-style: italic;
  font-weight: 500;
  font-size: 38px;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Flex align="center" justify="center" gap="8px">
        <img src={logo} alt="Logo" width={32} height={32} />
        <span>KanBan</span>
      </Flex>
    </StyledHeader>
  );
};
