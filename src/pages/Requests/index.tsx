import { FC } from 'react';
import styled from 'styled-components';

import Form from './Form';

const Page = styled.div`
  padding: 25px 20px;
  background-color: #fff;
`;

const RequestsPage: FC = () => {
  return (
    <Page>
      <Form />
    </Page>
  );
};

export default RequestsPage;
