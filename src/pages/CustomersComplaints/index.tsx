import { FC } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import Form from './Form';

import ChevronLeftIcon from '@icons/chevron-left.svg?react';

const Page = styled.div`
  width: 100%;
`;

const BackwardButton = styled(Link)`
  margin: 50px 0 0 50px;

  display: flex;
  align-items: center;
  column-gap: 5px;
  text-decoration: none;

  color: #717a81;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 30px auto 0 auto;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
`;

const CustomersComplaints: FC = () => {
  return (
    <Page>
      <BackwardButton to={'/'}>
        <ChevronLeftIcon width={12} height={12} />
        Back to home
      </BackwardButton>
      <Wrapper>
        <Title>Create customers complaints</Title>
        <Form />
      </Wrapper>
    </Page>
  );
};

export default CustomersComplaints;
