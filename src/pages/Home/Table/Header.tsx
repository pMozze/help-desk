import { FC } from 'react';
import styled from 'styled-components';

import { useTableFiltersStore } from './TableFiltersStore';
import Dropdown from '@/components/Dropdown';

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
  const { setType, setStatus } = useTableFiltersStore();

  return (
    <>
      <Title>Request List</Title>
      <Wrapper>
        <Dropdown
          label='Type'
          items={[
            { name: 'All', value: 'all' },
            { name: 'Requests from company employees', value: 'Requests from company employees' },
            {
              name: 'Requests from the technical department for work and incidents',
              value: 'Requests from the technical department for work and incidents'
            },
            { name: 'Customers complaints', value: 'Customers complaints' }
          ]}
          onSelect={item => setType(item.value)}
        />
        <Dropdown
          label='Status'
          items={[
            { name: 'All', value: 'all' },
            { name: 'Closed', value: 'CLOSED' },
            { name: 'In progress', value: 'IN_PROGRESS' },
            { name: 'Created', value: 'CREATED' }
          ]}
          onSelect={item => setStatus(item.value as 'all' | 'CLOSED' | 'IN_PROGRESS' | 'CREATED')}
        />
      </Wrapper>
    </>
  );
};

export default Header;
