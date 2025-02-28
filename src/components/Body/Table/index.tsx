import { FC } from 'react';

import Header from './Header';
import Table from './Table';
import Footer from './Footer';

const TableWrapper: FC = () => {
  return (
    <>
      <Header />
      <Table />
      <Footer />
    </>
  );
};

export default TableWrapper;
