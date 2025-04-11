import { FC } from 'react';
import styled from 'styled-components';

const Title = styled.div`
  padding: 25px 20px 0 20px;
  font-size: 28px;
  font-weight: 500;
`;

const Header: FC = () => {

  return (
    <>
      <Title>Wiki pages</Title>
    </>
  );
};

export default Header;
