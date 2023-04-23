import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Card } from '../cardComponents/Card';
import { Flex } from '../styleWrappers/Flex';
import plusIcon from '../../assets/img/svg/plus2.svg';
import { IRow } from '../../@types/types';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { renameRow } from '../../redux/slices/rowsSlice';
import { addCard } from '../../redux/slices/cardsSlice';

const StyledRow = styled.div`
  display: inline-block;
  margin-right: 18px;
  width: 339px;
  padding: 10px;
  background: #e3e4e6;
  border-radius: 5px;
  max-height: 100%;
  overflow: hidden;
`;

const StyledTitle = styled.input`
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  color: #40506c;
  text-align: center;
  border: none;
  background: #e3e4e6;
`;

const StyledAddCard = styled.button`
  width: 100%;
  padding: 4px 8px;
  background: transparent;
  border: none;
  border-radius: 3px;

  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #5e6c84;
  text-align: center;

  cursor: pointer;

  &:hover {
    background: #091e4214;
  }
`;

interface RowProps {
  row: IRow;
}

export const Row: React.FC<RowProps> = ({ row }) => {
  const dispatch = useAppDispatch();

  const { users, cards } = useAppSelector((state) => state);

  const [inputValue, setInputValue] = React.useState(row.title);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    dispatch(renameRow({ rowId: row.id, newTitle: e.target.value }));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onClickAddCart = () => {
    dispatch(addCard({ rowId: row.id, userId: users.currentUser.id }));
  };

  return (
    <StyledRow>
      <Flex direction="column" gap="10px" align="center">
        <>
          <StyledTitle value={inputValue} onChange={onChangeInput} />
          {cards
            ?.filter((card) => card.rowId === row.id)
            .map((card) => (
              <Card key={card.id} card={card} />
            ))}
          <StyledAddCard onClick={onClickAddCart}>
            <img src={plusIcon} alt="Add card" width={16} height={16} />
            <span>Add a card</span>
          </StyledAddCard>
        </>
      </Flex>
    </StyledRow>
  );
};
