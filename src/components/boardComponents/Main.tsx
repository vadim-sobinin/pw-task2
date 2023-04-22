import React from 'react';
import styled from 'styled-components';
import { Row } from './Row';
import 'reactjs-popup/dist/index.css';
import { AppContext } from '../../context/AppContext';

const StyledMain = styled.section`
  margin: 37px 0 0 35px;
  overflow: scroll;
  display: flex;
  width: fit-content;
  align-items: flex-start;
`;

export const Main: React.FC = () => {
  const rows = React.useContext(AppContext)?.rows;

  return (
    <>
      <StyledMain>
        {rows?.map((row) => (
          <Row key={row.id} row={row} />
        ))}
      </StyledMain>
    </>
  );
};
