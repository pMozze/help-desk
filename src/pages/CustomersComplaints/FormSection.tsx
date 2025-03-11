import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props extends PropsWithChildren {
  title: string;
}

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #868686;
`;

const Content = styled.div`
  padding: 15px;
  margin-top: 15px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px 40px;

  border-radius: 12px;
  background-color: #f8f9fa;
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
