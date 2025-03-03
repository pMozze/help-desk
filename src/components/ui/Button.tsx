import styled from 'styled-components';

import DefaultButton from './DefaultButton';

type Type = 'primary' | 'secondary' | 'tertiary';
type Size = 'small' | 'medium' | 'large';

const Button = styled(DefaultButton)<{ $type: Type; $size: Size }>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600px;
  column-gap: 5px;

  border-radius: 9999px;

  > svg {
    width: 14px;
    height: 14px;
  }

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.3;
  }

  ${({ $type }) => {
    switch ($type) {
      case 'primary':
        return `
          color: #fff;
          background-color: #05A83B;
        `;

      case 'secondary':
        return `
          color: #fff;
          background-color: #000;
        `;

      case 'tertiary':
        return `
          color: #000;
          background-color: #EBEBEB;
        `;
    }
  }}

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return `
          padding: 5px 35px;
          font-size: 14px;
        `;

      case 'medium':
        return `
          padding: 10px 35px;
          font-size: 14px;
        `;

      case 'large':
        return `
          padding: 12.5px 75px;
          font-size: 16px;
        `;
    }
  }}
`;

export default Button;
