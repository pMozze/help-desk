import { FC, ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  control: ReactElement;
}

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  column-gap: 45px;
`;

const Title = styled.div`
  flex-shrink: 0;
  flex-basis: 145px;

  font-size: 14px;
  text-wrap: balance;

  color: #717a81;
`;

const FormControl: FC<Props> = ({ title, control }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {control}
    </Wrapper>
  );
};

export default FormControl;
