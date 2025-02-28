import { FC } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Announcements from './Announcements';

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 440px;
`;

const Sidebar: FC = () => {
  return (
    <Wrapper>
      <Header />
      <Announcements />
    </Wrapper>
  );
};

export default Sidebar;
