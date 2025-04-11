import { FC } from 'react';
import styled from 'styled-components';

import TableWrapper from './Table';
import Cards from '../Home/Cards';
import Button from '@/components/ui/Button.tsx';
import { useNavigate } from 'react-router';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Cards />
      <TableWrapper />
      <Button type='button' $type='bordered' onClick={() => navigate('/')}>
        Back
      </Button>
    </Wrapper>
  );
};

export default Home;
