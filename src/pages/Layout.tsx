import { FC } from 'react';
import { Outlet } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';

import vanillaCalendarStyle from 'vanilla-calendar-pro/styles/index.css?inline';

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

  textarea {
    padding: 0;
    min-height: 1lh;

    display: block;
    width: fit-content;

    font: inherit;

    color: inherit;
    background-color: transparent;

    border: none;
    outline: none;

    resize: vertical;
  }

  button {
    padding: 0;

    display: block;
    width: fit-content;

    font: inherit;
    text-align: start;

    color: inherit;
    background-color: transparent;

    border: none;
    outline: none;

    cursor: pointer;
    user-select: none;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${vanillaCalendarStyle}

  [data-vc-months-month],
  [data-vc-years-year],
  [data-vc=month],
  [data-vc=year],
  [data-vc-date-btn],
  [data-vc-week-day] {
    font-family: 'SF Pro Display', sans-serif;
  }
`;

const Layout: FC = () => {
  return (
    <>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <GlobalStyle />
    </>
  );
};

export default Layout;
