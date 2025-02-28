import { FC } from 'react';
import styled from 'styled-components';

import Search from './Search';
import Pagination from './Pagination';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
`;

const Header: FC = () => {
  return (
    <Wrapper>
      <Search />
      <Pagination />
    </Wrapper>
  );
};

export default Header;
