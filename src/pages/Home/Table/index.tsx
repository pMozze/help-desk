import { FC } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Table from './Table';
import Footer from './Footer';

const StyledTableWrapper = styled.div`
  border-radius: 20px;
  background-color: #fff;
`;

const TableWrapper: FC = () => {
  return (
    <StyledTableWrapper>
      <Header />
      <Table />
      <Footer />
    </StyledTableWrapper>
  );
};

export default TableWrapper;
