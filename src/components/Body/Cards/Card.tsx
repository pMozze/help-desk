import { FC, SVGProps } from 'react';
import styled from 'styled-components';

import Button from '@/components/ui/Button';

import PlusIcon from '@icons/plus.svg?react';

interface Props {
  title: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  border-radius: 20px;

  background-color: #fff;

  > svg {
    margin: 30px auto 30px auto;
  }
`;

const Title = styled.div`
  min-height: calc(25px * 2 + 2lh);
  padding: 25px 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  font-weight: 500;
  text-align: center;

  background-color: #e9e9e9;
`;

const StyledButton = styled(Button)`
  margin: 0 auto 20px auto;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;

  font-size: 14px;
  font-weight: 600;

  color: #fff;
  background-color: #000000;

  border-radius: 9999px;

  > svg {
    width: 14px;
    height: 14px;
  }
`;

const Card: FC<Props> = ({ title, icon: Icon }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Icon width={72} height={72} />
      <StyledButton type='button'>
        <PlusIcon />
        New request
      </StyledButton>
    </Wrapper>
  );
};

export default Card;
