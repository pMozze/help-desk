import { FC } from 'react';
import { useSearchParams } from 'react-router';
import styled from 'styled-components';

import Header from './Header';
import Form from './Form';

const Page = styled.div`
  padding: 25px 20px;
  background-color: #fff;
`;

const StyledHeader = styled(Header)`
  margin-bottom: 15px;
`;

const TicketPage: FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <Page>
      {searchParams.has('view') && <StyledHeader />}
      <Form />
    </Page>
  );
};

export default TicketPage;
