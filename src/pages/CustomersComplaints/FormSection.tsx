import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props extends PropsWithChildren {
  title: string;
}

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 25px 40px;
  margin-top: 25px;
`;

const FormSection: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </div>
  );
};

export default FormSection;
