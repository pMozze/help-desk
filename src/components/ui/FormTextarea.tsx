import { forwardRef, ComponentPropsWithoutRef, FC, SVGProps } from 'react';
import styled from 'styled-components';

import DefaultTextarea from './DefaultTextarea';

interface Props extends ComponentPropsWithoutRef<'textarea'> {
  icon?: FC<SVGProps<SVGSVGElement>>;
}

const StyledDefaultTextarea = styled(DefaultTextarea)`
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

  textarea:placeholder-shown + span {
    font-size: 14px;
    translate: 0 calc(((18px - 1lh) * -1) + 15px);
  }
`;

const Placeholder = styled.span`
  position: absolute;

  top: 5px;

  font-size: 12px;
  font-weight: 500;

  color: #868686;
`;

const FormTextarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { icon: Icon, placeholder } = props;

  return (
    <Wrapper>
      <StyledDefaultTextarea ref={ref} {...props} />
      {placeholder && <Placeholder>{placeholder}</Placeholder>}
      {Icon && <Icon />}
    </Wrapper>
  );
});

export default FormTextarea;
