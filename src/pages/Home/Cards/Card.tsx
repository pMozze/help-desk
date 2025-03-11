import { FC, SVGProps } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

interface Props {
  title: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  href: string;
}

const Wrapper = styled(Link)`
  padding: 25px 30px 15px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  text-decoration: inherit;
  border-radius: 12px;

  color: inherit;
  background-color: #fff;
`;

const Title = styled.div`
  margin-block: auto;
  font-weight: 500;
  text-align: center;
`;

const Card: FC<Props> = ({ title, icon: Icon, href }) => {
  return (
    <Wrapper to={href}>
      <Icon width={56} height={56} />
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default Card;
