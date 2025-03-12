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

  [data-vc-type=default] {
    padding: 10px;
    width: fit-content;
    min-width: auto;
  }

  [data-vc-type=default] [data-vc=week] {
    margin-bottom: 5px;
    background-color: #EEEEEE;
  }

  [data-vc-type=default] [data-vc-week-day] {
    width: 32px;
    height: 32px;

    font-size: 12px;
    font-weight: 500;

    color: #5A5A5A !important;
  }

  [data-vc-type=default] [data-vc=dates] {
    row-gap: 11px;
  }

  [data-vc-type=default] [data-vc-date] {
    position: relative;
    padding-top: 0;
    
    width: 32px;
    height: 32px;

    &:not(:nth-child(-n + 7)) {
      &::after {
        position: absolute;
        top: -6px;
        right: 0;
  
        display: block;
        content: '';
  
        width: 100%;
        height: 1px;
  
        background-color: #E8E8E8;
      }
    }
  }

  [data-vc-type=default] .vc-date__btn {
    font-weight: 400 !important;

    color: #5A5A5A !important;
    background-color: transparent !important;

    border-radius: 0 !important;
  }

  [data-vc-type=default] .vc-date[data-vc-date-month=next] .vc-date__btn, .vc-date[data-vc-date-month=prev] .vc-date__btn {
    color: rgba(90, 90, 90, .5) !important;
  }

  [data-vc-type=default] .vc-date[data-vc-date-holiday] .vc-date__btn, .vc-date[data-vc-date-weekend] .vc-date__btn {
    color: #ff0000 !important;
  }

  [data-vc-type=default] .vc-date[data-vc-date-holiday][data-vc-date-month=next] .vc-date__btn, .vc-date[data-vc-date-holiday][data-vc-date-month=prev] .vc-date__btn, .vc-date[data-vc-date-weekend][data-vc-date-month=next] .vc-date__btn, .vc-date[data-vc-date-weekend][data-vc-date-month=prev] .vc-date__btn {
    color: rgba(255, 0, 0, .5) !important;
  }

  [data-vc-type=default] .vc-date[data-vc-date-selected] .vc-date__btn {
    color: #000 !important;
    background-color: #DBE3EA !important;
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
