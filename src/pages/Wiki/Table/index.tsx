import { FC } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

import { apiFetcher } from '@/api/utils';
import { WikiPage } from '@/api/models';

import Header from './Header';
import Table from './Table';
// import Footer from './Footer';

const StyledTableWrapper = styled.div`
  border-radius: 20px;
  background-color: #fff;
`;

const TableWrapper: FC = () => {
  const { data } = useSWR<WikiPage[], Error>('/wiki/', apiFetcher);

  if (!data) {
    return;
  }

  return (
    <StyledTableWrapper>
      <Header />
      <Table items={data} />
      {/* <Footer /> */}
    </StyledTableWrapper>
  );
};

export default TableWrapper;
