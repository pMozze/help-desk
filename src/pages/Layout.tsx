import { FC } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;

  color: #000;

  * {
    box-sizing: border-box;
  }

  input {
    padding: 0;

    display: block;
    width: fit-content;

    font: inherit;

    color: inherit;
    background-color: transparent;

    border: none;
    outline: none;
  }
`;

const Layout: FC = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
