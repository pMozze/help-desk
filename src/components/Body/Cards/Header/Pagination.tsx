import { FC } from 'react';
import styled from 'styled-components';

import DefaultButton from '@/components/ui/DefaultButton';

import ChevronLeftIcon from '@icons/chevron-left.svg?react';
import ChevronRightIcon from '@icons/chevron-right.svg?react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;

  font-size: 14px;
  font-weight: 500;

  > span > span {
    color: #717a81;
  }
`;

const StyledButton = styled(DefaultButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  color: #717a81;
  background-color: #e9e9e9;

  border-radius: 100%;
`;

const Pagination: FC = () => {
  return (
    <Wrapper>
      <StyledButton disabled>
        <ChevronLeftIcon />
      </StyledButton>
      <span>
        1 <span>/</span> 1
      </span>
      <StyledButton disabled>
        <ChevronRightIcon />
      </StyledButton>
    </Wrapper>
  );
};

export default Pagination;
