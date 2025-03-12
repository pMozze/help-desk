import styled from 'styled-components';

type Type = 'primary' | 'ghost';

const Button = styled.button<{ $type: Type }>`
  && {
    padding: 20px 40px;

    font-weight: 600;
    line-height: 22px;
    text-transform: uppercase;

    border-radius: 8px;

    ${({ $type }) => {
      switch ($type) {
        case 'primary':
          return `
          color: #fff;
          background-color: #3AC6F3;
        `;

        case 'ghost':
          return `
          color: #000;
          background-color: #fff;
        `;
      }
    }}
  }
`;

export default Button;
