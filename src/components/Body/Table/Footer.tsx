import { FC } from 'react';
import styled from 'styled-components';

import Pagination from '@/components/ui/Pagination';

const Wrapper = styled.div`
  padding: 11px 20px 25px 20px;

  display: flex;
  align-items: center;

  position: relative;
  background-color: #fff;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  &::before {
    position: absolute;

    top: 0;
    left: 20px;

    display: block;
    content: '';

    width: calc(100% - 40px);
    height: 1px;

    background-color: #868686;
  }
`;

const Text = styled.div`
  font-size: 14px;
  color: #717a81;

  > span {
    font-weight: 500;
  }
`;

const StyledText = styled(Text)`
  margin-left: 60px;
`;

const StyledPagination = styled(Pagination)`
  margin-left: auto;
`;

const Footer: FC = () => {
  return (
    <Wrapper>
      <Text>
        <span>Checked:</span> 0 / 8
      </Text>
      <StyledText>
        <span>Total:</span> 23
      </StyledText>
      <StyledPagination />
    </Wrapper>
  );
};

export default Footer;
