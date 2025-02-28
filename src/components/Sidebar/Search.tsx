import { FC, useRef } from 'react';
import styled from 'styled-components';

import Input from '../ui/Input';
import Button from '../ui/Button';

import SearchIcon from '@icons/search.svg?react';
import CrossIcon from '@icons/cross.svg?react';

interface Props {
  className?: string;
}

const Wrapper = styled.div`
  padding-inline: 15px;

  display: flex;
  align-items: center;
  column-gap: 10px;

  height: 40px;

  border-radius: 9999px;
  background-color: #fff;
`;

const SearchInput = styled(Input)`
  flex-grow: 1;
  height: 100%;
  font-size: 14px;

  &:valid + button {
    display: block;
  }
`;

const ResetButton = styled(Button)`
  display: none;
`;

const Search: FC<Props> = ({ className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper className={className}>
      <SearchIcon />
      <SearchInput ref={inputRef} type='text' required />
      <ResetButton type='button' onClick={() => (inputRef.current!.value = '')}>
        <CrossIcon />
      </ResetButton>
    </Wrapper>
  );
};

export default Search;
