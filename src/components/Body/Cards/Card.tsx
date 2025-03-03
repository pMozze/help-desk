import { FC, SVGProps } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import PlusIcon from '@icons/plus.svg?react';

interface Props {
  title: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  href: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  border-radius: 20px;

  background-color: #fff;
  container-type: inline-size;

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

  font-size: clamp(14px, 5.3cqw, 18px);
  font-weight: 500;
  text-align: center;

  background-color: #e9e9e9;
`;

const StyledLink = styled(Link)`
  margin: 0 auto 20px auto;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;

  font-size: 14px;
  font-weight: 600;
  text-decoration: none;

  color: #fff;
  background-color: #000000;

  border-radius: 9999px;

  > svg {
    width: 14px;
    height: 14px;
  }
`;

const Card: FC<Props> = ({ title, icon: Icon, href }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Icon width={72} height={72} />
      <StyledLink to={href}>
        <PlusIcon />
        New request
      </StyledLink>
    </Wrapper>
  );
};

export default Card;
