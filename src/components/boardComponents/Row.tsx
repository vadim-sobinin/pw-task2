import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Card } from '../cardComponents/Card';
import { Flex } from '../styleWrappers/Flex';
import plusIcon from '../../assets/img/svg/plus2.svg';
import { IRow, ICard } from '../../@types/types';
import { AppContext } from '../../context/AppContext';
import debounce from 'lodash.debounce';

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
  const context = React.useContext(AppContext);

  const cards = context?.cards;
  const setCards = context?.setCards;
  const currentUser = context?.currentUser;

  const [inputValue, setInputValue] = React.useState(row.title);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    context && updateRowTitle(e.target.value, context.rows);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateRowTitle = React.useCallback(
    debounce((input, rows: IRow[]) => {
      const RowIndex = rows.findIndex((findRow) => findRow.id === row.id);
      const newRowArr: IRow[] = JSON.parse(JSON.stringify(rows));
      newRowArr[RowIndex].title = input;
      context?.setRows(newRowArr);
    }, 500),
    [],
  );

  const onClickAddCart = () => {
    if (currentUser && cards && setCards) {
      const newCard: ICard[] = [
        {
          id: Date.now().toString(),
          title: 'New card',
          description: '',
          rowId: row.id,
          userId: currentUser.id,
        },
      ];
      setCards(cards.concat(newCard));
    }
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
