import { FC } from 'react';
import styled from 'styled-components';

import Sidebar from '@/components/Sidebar';
import Body from '@/components/Body';

const Wrapper = styled.div`
  @font-face {
    font-family: 'SF Pro Display';
    font-weight: 400;
    src: url('/fonts/SFProDisplay/dehinted-SFProDisplay-Regular.woff2') format('woff');
  }

  @font-face {
    font-family: 'SF Pro Display';
    font-weight: 500;
    src: url('/fonts/SFProDisplay/dehinted-SFProDisplay-Medium.woff2') format('woff');
  }

  @font-face {
    font-family: 'SF Pro Display';
    font-weight: 600;
    src: url('/fonts/SFProDisplay/dehinted-SFProDisplay-Semibold.woff2') format('woff');
  }

  display: flex;
  column-gap: 30px;

  font-family: 'SF Pro Display', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;

  color: #000;

  * {
    box-sizing: border-box;
  }
`;

const Home: FC = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Body />
    </Wrapper>
  );
};

export default Home;
