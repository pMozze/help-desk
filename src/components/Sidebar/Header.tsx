import { FC } from 'react';
import styled from 'styled-components';

import DefaultButton from '../ui/DefaultButton';
import Search from './Search';

import CalendarIcon from '@icons/calendar.svg?react';

const Wrapper = styled.div`
  padding: 20px 20px 30px 20px;
  border-radius: 20px 20px 0 0;
  background-color: #000;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  column-gap: 20px;
  margin-top: 20px;
`;

const CalendarButton = styled(DefaultButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 100%;
  background-color: #fff;
`;

const StyledSearch = styled(Search)`
  flex-grow: 1;
`;

const Header: FC = () => {
  return (
    <Wrapper>
      <Title>Announcement</Title>
      <Row>
        <CalendarButton type='button'>
          <CalendarIcon />
        </CalendarButton>
        <StyledSearch />
      </Row>
    </Wrapper>
  );
};

export default Header;
