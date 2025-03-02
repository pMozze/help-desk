import { forwardRef, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

import { default as DefaultInput } from '@/components/ui/Input';

interface Props extends ComponentPropsWithoutRef<'input'> {
  label?: string;
}

const StyledDefaultInput = styled(DefaultInput)`
  flex-grow: 1;

  font-size: 18px;
  font-weight: 500;

  &::placeholder {
    opacity: 0;
  }
`;

const Wrapper = styled.label`
  padding: 20px 15px;

  display: flex;
  position: relative;

  border-radius: 8px;
  background-color: #fff;

  input:placeholder-shown + span {
    font-size: 14px;
    translate: 0 -50%;
  }
`;

const Placeholder = styled.span`
  position: absolute;

  top: 50%;
  translate: 0 -150%;

  font-size: 12px;
  font-weight: 500;

  color: #868686;
`;

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { placeholder } = props;

  return (
    <Wrapper>
      <StyledDefaultInput ref={ref} type='text' {...props} />
      {placeholder && <Placeholder>{placeholder}</Placeholder>}
    </Wrapper>
  );
});

export default Input;
