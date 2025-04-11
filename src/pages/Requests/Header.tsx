import { FC } from 'react';
import { match } from 'ts-pattern';
import styled from 'styled-components';

import Badge from '@/components/ui/Badge';

import { Ticket } from '@/api/models';

interface Props extends Pick<Ticket, 'responsibleUserName' | 'status'> {
  className?: string;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #868686;
`;

const StyledBadge = styled(Badge)`
  color: #868686;
  background-color: transparent;
`;

const Header: FC<Props> = ({ responsibleUserName, status, className }) => {
  return (
    <Wrapper className={className}>
      <Title>Responsible: {responsibleUserName}</Title>
      <StyledBadge
        variant={match<string, 'danger' | 'warning' | 'success' | 'info'>(status)
          .with('CREATED', () => 'danger')
          .with('ASSIGNED', () => 'warning')
          .with('IN_PROGRESS', () => 'info')
          .with('CLOSED', () => 'success')
          .otherwise(() => 'danger')}
        text={match(status)
          .with('CREATED', () => 'Created')
          .with('ASSIGNED', () => 'Assigned')
          .with('IN_PROGRESS', () => 'In Progress')
          .with('CLOSED', () => 'Closed')
          .otherwise(state => state)}
      />
    </Wrapper>
  );
};

export default Header;
