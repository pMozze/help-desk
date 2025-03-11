import { FC } from 'react';
import styled from 'styled-components';

import Cards from './Cards';
import TableWrapper from './Table';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Home: FC = () => {
  return (
    <Wrapper>
      <Cards />
      <TableWrapper />
    </Wrapper>
  );
};

export default Home;
