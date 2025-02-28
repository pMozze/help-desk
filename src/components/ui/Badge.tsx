import { FC } from 'react';
import styled from 'styled-components';

type Variant = 'success' | 'warning' | 'danger';

interface Props {
  text: string;
  variant: Variant;
  className?: string;
}

const Wrapper = styled.div<{ $variant: Variant }>`
  --accent-color: ${({ $variant }) => {
    switch ($variant) {
      case 'success':
        return '#05A83B';

      case 'warning':
        return '#F2994A';

      case 'danger':
        return '#C91414';

      default:
        return 'currentColor';
    }
  }};

  padding: 5px 10px;
  width: fit-content;

  display: flex;
  align-items: center;
  column-gap: 5px;

  font-size: 14px;
  font-weight: 500;
  line-height: 1;

  color: var(--accent-color);
  background-color: color-mix(in srgb, var(--accent-color) 10%, transparent);

  border-radius: 9999px;

  &::before {
    display: block;
    content: '';

    width: 5px;
    height: 5px;

    border-radius: 100%;
    background-color: var(--accent-color);
  }
`;

const Badge: FC<Props> = ({ text, variant, className }) => {
  return (
    <Wrapper className={className} $variant={variant}>
      {text}
    </Wrapper>
  );
};

export default Badge;
