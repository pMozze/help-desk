import { FC, PropsWithChildren, Children } from 'react';
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

  display: flex;
  flex-direction: column;
  row-gap: 15px;

  border-radius: 12px;
  background-color: #f8f9fa;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #c6cdd3;
`;

const FormSection: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <Title>{title}</Title>
      <Content>
        {Children.map(children, (child, childIndex) => (
          <>
            {child}
            {childIndex < Children.count(children) - 1 && <Divider />}
          </>
        ))}
      </Content>
    </div>
  );
};

export default FormSection;
