import { FC } from 'react';
import { match } from 'ts-pattern';
import styled from 'styled-components';

import Badge from '@/components/ui/Badge';
// import Button from '@/components/ui/Button';
// import Timeline from '@/components/Timeline';

// import StickerIcon from '@icons/sticker.svg?react';
// import MessageIcon from '@icons/message.svg?react';

import { Ticket } from '@/api/models';

interface Props extends Pick<Ticket, 'responsibleUserName' | 'status'> {
  className?: string;
}

const Top = styled.div`
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

// const Wrapper = styled.div`
//   padding: 25px 15px;
//   margin-top: 10px;
//   border-radius: 12px;
//   background-color: #f8f9fa;
// `;

// const Date = styled.div`
//   font-size: 14px;
//   color: #717a81;
// `;

// const Buttons = styled.div`
//   display: flex;
//   column-gap: 5px;
//   margin-top: 35px;
// `;

// const StyledButton = styled(Button)`
//   && {
//     padding: 10px 20px;

//     display: flex;
//     align-items: center;
//     column-gap: 5px;

//     border-radius: 4px;
//   }
// `;

// const StyledTimeline = styled(Timeline)`
//   margin-top: 15px;
// `;

const Header: FC<Props> = ({ responsibleUserName, status, className }) => {
  return (
    <div className={className}>
      <Top>
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
      </Top>
      {/* <Wrapper>
        <Date>04 Feb 2025</Date>
        <Buttons>
          <StyledButton $type='bordered' type='button'>
            Details <StickerIcon />
          </StyledButton>
          <StyledButton $type='bordered' type='button'>
            Message <MessageIcon />
          </StyledButton>
        </Buttons>
        <StyledTimeline steps={['Submitted', 'Approved by HOIT']} progress={45} />
      </Wrapper> */}
    </div>
  );
};

export default Header;
