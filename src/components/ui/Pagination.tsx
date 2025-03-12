import { FC } from 'react';
import styled from 'styled-components';

import ChevronLeftIcon from '@icons/chevron-left.svg?react';
import ChevronRightIcon from '@icons/chevron-right.svg?react';

interface Props {
  className?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  column-gap: 40px;
  justify-content: space-between;
`;

const PaginationButton = styled.button`
  && {
    display: flex;
    align-items: center;
    column-gap: 5px;

    font-size: 14px;
    font-weight: ${({ disabled }) => (disabled ? '400' : '500')};

    ${({ disabled }) => disabled && 'color: #717A81'};
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  column-gap: 5px;
`;

const Item = styled.button`
  && {
    font-size: 14px;
    font-weight: ${({ disabled }) => (disabled ? '400' : '500')};

    ${({ disabled }) => disabled && 'color: #717A81'};
  }
`;

const Pagination: FC<Props> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <PaginationButton disabled>
        <ChevronLeftIcon />
        Pervious
      </PaginationButton>
      <ItemsWrapper>
        <Item disabled>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </ItemsWrapper>
      <PaginationButton>
        Next
        <ChevronRightIcon />
      </PaginationButton>
    </Wrapper>
  );
};

export default Pagination;
