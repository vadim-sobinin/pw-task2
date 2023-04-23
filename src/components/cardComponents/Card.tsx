import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Flex } from '../styleWrappers/Flex';
import editIcon from '../../assets/img/svg/edit.svg';
import commentIcon from '../../assets/img/svg/comment.svg';
import { ICard } from '../../@types/types';
import CardPopup, { RefType } from './CardPopup';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { updateCardName } from '../../redux/slices/cardsSlice';

const FlexWithCursor = styled(Flex)`
  cursor: pointer;
`;

const StyledCard = styled.div`
  background: #fff;

  width: 100%;
  border-radius: 4px;

  &:hover {
    background: #f4f5f7;
  }
`;

const StyledCardName = styled.textarea`
  position: relative;
  padding-top: 10px;
  color: #1e1e1e;
  background: transparent;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  flex-grow: 1;
  border: none;
  resize: none;
  overflow: hidden;
  min-height: 25px;
  max-height: 100px;

  /* &:focus {
    outline: none;

    & ~ button {
      display: none;
    }
  } */

  &:disabled {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  display: inline;
  height: 22px;
  width: 22px;
  cursor: pointer;
`;

const StyledCommentButton = styled(StyledButton)`
  & span {
    position: absolute;
    right: -10px;
    top: -4px;
    font-size: 11px;
  }
`;

interface PropsType {
  card: ICard;
}

export function autoGrow(elem: HTMLTextAreaElement) {
  if (elem) {
    elem.style.height = '5px';
    elem.style.height = elem.scrollHeight + 'px';
  }
}

export const Card: React.FC<PropsType> = ({ card }) => {
  const dispatch = useAppDispatch();

  const refCardNameInput = React.useRef<HTMLTextAreaElement>(null);
  const refPopup = React.useRef<RefType>(null);
  const [editing, setEditing] = React.useState(false);

  const [inputValue, setInputValue] = React.useState(card.title);

  React.useEffect(() => {
    setInputValue(card.title);
  }, [card.title]);

  const onPressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'Escape') {
      dispatch(updateCardName({ cardId: card.id, newName: inputValue }));
      setEditing(false);
    }
  };

  const onInputBlur = () => {
    setEditing(false);
    dispatch(updateCardName({ cardId: card.id, newName: inputValue }));
  };

  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    autoGrow(e.target);
    setInputValue(e.target.value);
  };

  const onClickCard1 = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.editBtn') && !editing && refPopup.current) {
      refPopup.current.onClickCard();
    }
  };

  const onClickEdit = () => {
    setEditing(true);
    setTimeout(() => {
      refCardNameInput.current?.focus();
    }, 100);
  };

  return (
    <StyledCard>
      <FlexWithCursor
        //@ts-ignore
        onClick={onClickCard1}
        gap="10px"
        padding="2px 2px 10px 16px"
        direction="column">
        <Flex>
          <StyledCardName
            rows={1}
            ref={refCardNameInput}
            autoFocus={true}
            value={inputValue}
            disabled={!editing}
            onKeyDown={(e) => onPressKey(e)}
            onBlur={onInputBlur}
            onChange={onChangeInput}></StyledCardName>

          <StyledButton className={'editBtn'}>
            <img
              onClick={onClickEdit}
              src={editIcon}
              alt="edit name button"
              width={22}
              height={22}
            />
          </StyledButton>
        </Flex>
        <StyledCommentButton>
          <img src={commentIcon} alt="edit name button" width={22} height={22} />
          <span>
            {
              useAppSelector((state) => state.comments).filter(
                (comment) => comment.cardId === card.id,
              ).length
            }
          </span>
        </StyledCommentButton>
      </FlexWithCursor>

      <CardPopup ref={refPopup} card={card} />
    </StyledCard>
  );
};
