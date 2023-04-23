import React, { forwardRef, useImperativeHandle, Ref } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { ICard } from '../../@types/types';

import iconCard from '../../assets/img/svg/card.svg';
import iconDelete from '../../assets/img/svg/delete.svg';
import { Comments } from '../commentsComponents/Comments';
import { Flex } from '../styleWrappers/Flex';
import { autoGrow } from './Card';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { deleteCard, updateCardName } from '../../redux/slices/cardsSlice';

const StyledPopup = styled(Popup)`
  font-size: 12px;

  &-content {
    border-radius: 5px;
    height: 90vh;
    overflow: auto;
    width: 768px;
  }
`;

const StyledContent = styled.div`
  width: 100%;
`;

const StyledButtons = styled.button`
  cursor: pointer;

  display: block;
  padding: 3px 5px;
  line-height: 20px;

  font-size: 24px;
  background: #ffffff;
  border-radius: 100%;
  border: 1px solid #cfcece;

  &:focus {
    outline: none;
  }
`;

const StyledCloseButton = styled(StyledButtons)`
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
`;

const StyledHeader = styled.div`
  width: 100%;
  font-size: 18px;
  min-height: 32px;
  padding: 12px 40px 8px 56px;
  position: relative;
  z-index: 1;

  span {
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    color: #172b4d;
  }

  p {
    color: #5e6c84;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    span {
      text-decoration: underline;
    }
  }
`;

const StyledTitleTextArea = styled.textarea`
  color: #172b4d;
  width: 100%;
  border-radius: 3px;
  box-shadow: none;
  font-size: 20px;
  font-weight: 600;
  height: 32px;
  line-height: 24px;
  margin: -4px -8px;
  padding: 4px 8px;
  resize: none;
  border: none;

  /* overflow: hidden;
  overflow-wrap: break-word; */
`;

const StyledIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 12px;
  left: 15px;
`;

const StyledDescriptionTextArea = styled(StyledTitleTextArea)`
  margin: 0;
  padding-left: 56px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  /* &:focus {
    outline: none;
  } */
`;

export interface PropsType {
  card: ICard;
}
interface refOpenType {
  open: () => void;
}
export interface RefType {
  onClickCard: () => void;
}

const CardPopup = ({ card }: PropsType, ref: Ref<RefType>) => {
  const dispatch = useAppDispatch();

  const { rows, users } = useAppSelector((state) => state);
  const userList = users.users;

  const [inputValue, setInputValue] = React.useState(card.title);

  React.useEffect(() => {
    setInputValue(card.title);
  }, [card.title]);

  const refOpen = React.useRef<refOpenType>(null);
  // const inputRef = React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  function onClickCard() {
    if (refOpen.current) {
      refOpen.current.open();
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoGrow(e.target);
    setInputValue(e.target.value);
  };

  const onClickDelete = () => {
    if (window.confirm('Are you sure that you want to delete this card?'))
      dispatch(deleteCard(card));
  };

  useImperativeHandle(ref, () => ({ onClickCard }));

  return (
    // @ts-ignore
    <StyledPopup ref={refOpen} modal nested>
      {
        // @ts-ignore
        (close) => (
          <div>
            <StyledCloseButton onClick={close}>&times;</StyledCloseButton>
            <StyledHeader>
              <StyledIconWrapper>
                <img src={iconCard} alt="icon" width={24} height={24} />
              </StyledIconWrapper>
              <StyledTitleTextArea
                onBlur={() => dispatch(updateCardName({ cardId: card.id, newName: inputValue }))}
                onChange={onChangeInput}
                value={inputValue}
              />
              <p>
                in list <span>{rows.find((row) => row.id === card.rowId)?.title}</span>
              </p>
              <p>
                created by <span>{userList.find((user) => user.id === card.userId)?.name}</span>
              </p>
            </StyledHeader>
            <StyledContent>
              <StyledHeader>
                <StyledIconWrapper>
                  <img src={iconCard} alt="icon" width={24} height={24} />
                </StyledIconWrapper>
                <span>Description</span>
              </StyledHeader>
              <StyledDescriptionTextArea
                onChange={(e) => autoGrow(e.target)}
                defaultValue={card.description}
              />
            </StyledContent>

            <StyledHeader>
              <StyledIconWrapper>
                <img src={iconCard} alt="icon" width={24} height={24} />
              </StyledIconWrapper>
              <Flex justify="space-between" align="center">
                <span>Activity</span>
                <StyledButtons onClick={onClickDelete}>
                  <img src={iconDelete} alt="delete card" />
                </StyledButtons>
              </Flex>

              <Comments currentUser={users.currentUser} currentCardId={card.id} />
            </StyledHeader>
          </div>
        )
      }
    </StyledPopup>
  );
};

export default forwardRef(CardPopup);
