import styled from 'styled-components';

const Button = styled.button`
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
`;

export default Button;
