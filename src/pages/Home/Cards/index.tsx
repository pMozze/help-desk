import { FC } from 'react';
import styled from 'styled-components';

import Card from './Card';

import EApplicationIcon from '@icons/e-application.svg?react';
import EApplication2Icon from '@icons/e-application-2.svg?react';
import EApplication3Icon from '@icons/e-application-3.svg?react';

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  > * {
    flex-basis: 300px;
  }
`;

const Cards: FC = () => {
  return (
    <CardsWrapper>
      <Card title='Requests from company employees' icon={EApplicationIcon} href='/requests/create?type=employees' />
      <Card
        title='Requests from the technical department for work and incidents'
        icon={EApplication2Icon}
        href='/requests/create?type=tech'
      />
      <Card title='Customers complaints' icon={EApplication3Icon} href='/ticket/create' />
      <Card title='Wiki' icon={EApplication3Icon} href='/wiki' />
    </CardsWrapper>
  );
};

export default Cards;
