import { FC } from 'react';
import styled from 'styled-components';

import Input from '@/components/ui/Input';

import SearchIcon from '@icons/search.svg?react';

const Wrapper = styled.label`
  flex-grow: 1;
  padding-block: 10px;

  display: flex;
  align-items: center;
  column-gap: 10px;

  color: #717a81;
  border-bottom: 1px solid #e9e9e9;
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
  font-size: 14px;
  color: #717a81;
`;

const Search: FC = () => {
  return (
    <Wrapper>
      <SearchIcon />
      <StyledInput type='text' placeholder='Search' />
    </Wrapper>
  );
};

export default Search;
