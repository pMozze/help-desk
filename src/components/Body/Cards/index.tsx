import { FC } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Card from './Card';

import EApplicationIcon from '@icons/e-application.svg?react';
import EApplication2Icon from '@icons/e-application-2.svg?react';
import EApplication3Icon from '@icons/e-application-3.svg?react';

const Wrapper = styled.div`
  margin-top: 10px;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 30px;
  margin-top: 10px;
`;

const Cards: FC = () => {
  return (
    <Wrapper>
      <Header />
      <CardsWrapper>
        <Card title='Requests from company employees' icon={EApplicationIcon} href='' />
        <Card title='Requests from the technical department for work and incidents' icon={EApplication2Icon} href='' />
        <Card title='Customers complaints' icon={EApplication3Icon} href='/customers-complaints' />
      </CardsWrapper>
    </Wrapper>
  );
};

export default Cards;
