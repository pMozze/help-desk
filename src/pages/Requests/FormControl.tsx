import { FC, ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  control: ReactElement;
}

const Wrapper = styled.label`
  display: flex;
  column-gap: 45px;
  width: fit-content;
`;

const Title = styled.div`
  min-height: 38px;
  height: fit-content;

  align-content: center;

  flex-shrink: 0;
  flex-basis: 145px;

  font-size: 14px;
  line-height: 1.35;
  text-wrap: balance;

  color: #717a81;
`;

const ControlWrapper = styled.div`
  min-width: 250px;
`;

const FormControl: FC<Props> = ({ title, control }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ControlWrapper>{control}</ControlWrapper>
    </Wrapper>
  );
};

export default FormControl;
