import { forwardRef, ComponentPropsWithoutRef, useImperativeHandle } from 'react';
import { useMask, MaskOptions } from '@react-input/mask';
import Input from './ui/Input';

interface Props extends ComponentPropsWithoutRef<'input'> {
  maskOptions: MaskOptions;
}

const MaskedInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { maskOptions, ...rest } = props;
  const maskedInputRef = useMask(maskOptions);

  useImperativeHandle(ref, () => maskedInputRef.current);
  return <Input ref={maskedInputRef} {...rest} />;
});

export default MaskedInput;
