import { forwardRef, ComponentPropsWithoutRef, FC, SVGProps } from 'react';
import styled from 'styled-components';

import DefaultInput from '@/components/ui/DefaultInput';

interface Props extends ComponentPropsWithoutRef<'input'> {
  icon?: FC<SVGProps<SVGSVGElement>>;
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
  position: relative;
  padding: 20px 15px;

  display: flex;
  align-items: center;
  column-gap: 15px;

  border-radius: 8px;
  background-color: #fff;

  height: fit-content;

  > input:placeholder-shown + span {
    font-size: 14px;
    translate: 0 -50%;
  }

  > svg {
    flex-shrink: 0;
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

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { icon: Icon, placeholder } = props;

  return (
    <Wrapper>
      <StyledDefaultInput ref={ref} {...props} />
      {placeholder && <Placeholder>{placeholder}</Placeholder>}
      {Icon && <Icon width={16} height={16} />}
    </Wrapper>
  );
});

export default FormInput;
