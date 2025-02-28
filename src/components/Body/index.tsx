import { FC } from 'react';
import styled from 'styled-components';

import TableWrapper from './Table';
import Cards from './Cards';

const Wrapper = styled.div`
  flex-grow: 1;
`;

const Body: FC = () => {
  return (
    <Wrapper>
      <Cards />
      <TableWrapper />
    </Wrapper>
  );
};

export default Body;
