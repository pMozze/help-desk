import { FC } from 'react';
import styled from 'styled-components';

import Dropdown from '@/components/ui/Dropdown';

const Title = styled.div`
  padding: 25px 20px 0 20px;
  font-size: 28px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  margin-top: 15px;
  padding: 15px 20px;

  display: flex;
  column-gap: 30px;

  border-bottom: 1px solid #868686;
`;

const Header: FC = () => {
  return (
    <>
      <Title>Request List</Title>
      <Wrapper>
        <Dropdown label='Type' items={[{ name: 'All', value: 'all' }]} />
        <Dropdown
          label='Status'
          items={[
            { name: 'All', value: 'all' },
            { name: 'Submitted', value: 'submitted' },
            { name: 'Revoked', value: 'revoked' },
            { name: 'Rejected', value: 'rejected' }
          ]}
        />
      </Wrapper>
    </>
  );
};

export default Header;
