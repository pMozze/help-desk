import styled from 'styled-components';
import DefaultInput from './DefaultInput';

const Input = styled(DefaultInput)`
  height: fit-content;
  padding: 10px 20px;

  font-size: 14px;
  line-height: 16px;

  color: #000;
  background-color: #fff;

  border-radius: 8px;
  border: 1px solid #dadada;

  &::placeholder {
    color: #717a81;
  }
`;

export default Input;
