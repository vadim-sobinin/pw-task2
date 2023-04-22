import React from 'react';
import styled from 'styled-components';

interface FlexProps {
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
  padding?: string;
  margin?: string;
  children?: React.ReactNode;
  // onClick?: React.MouseEventHandler<HTMLDivElement> & React.MouseEvent<Element, MouseEvent>;
}

const StyledFlex = styled.div<FlexProps>`
  height: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${(props) => props.align || 'stretch'};
  justify-content: ${(props) => props.justify || 'stretch'};
  gap: ${(props) => props.gap || 'none'};
  padding: ${(props) => props.padding || '0'};
  margin: ${(props) => props.margin || '0'};
`;

export const Flex: React.FC<FlexProps> = (props) => {
  return <StyledFlex {...props}></StyledFlex>;
};
