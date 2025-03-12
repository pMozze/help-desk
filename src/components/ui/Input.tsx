import { FC, forwardRef, ComponentPropsWithoutRef, SVGProps } from 'react';
import styled, { css } from 'styled-components';

interface Props extends ComponentPropsWithoutRef<'input'> {
  icon?: FC<SVGProps<SVGSVGElement>>;
}

const InputStyles = css`
  && {
    padding: 10px 20px;

    min-width: 250px;
    height: fit-content;

    font-size: 14px;
    line-height: 16px;

    color: #000;
    background-color: #fff;

    border-radius: 8px;
    border: 1px solid #dadada;

    &::placeholder {
      color: #717a81;
    }
  }
`;

const StyledInput = styled.input`
  ${InputStyles}
`;

const Wrapper = styled.label`
  ${InputStyles}

  && {
    padding-right: 10px;

    display: flex;
    align-items: center;
    column-gap: 10px;

    > input {
      flex-grow: 1;
    }

    > svg {
      display: block;
      flex-shrink: 0;

      width: 14px;
      height: 14px;
    }
  }
`;

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { icon: Icon, ...rest } = props;

  return Icon ? (
    <Wrapper>
      <input ref={ref} {...rest} />
      <Icon />
    </Wrapper>
  ) : (
    <StyledInput ref={ref} {...rest} />
  );
});

export default Input;
