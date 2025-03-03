import { forwardRef, ComponentPropsWithoutRef, useState } from 'react';
import styled from 'styled-components';

import DefaultButton from './DefaultButton';
import ChevronDownIcon from '@icons/chevron-down.svg?react';

type Option = {
  name: string;
  value: string;
};

interface Props extends ComponentPropsWithoutRef<'select'> {
  options: Option[];
  placeholder: string;
}

const Wrapper = styled.div<{ $isOpen: boolean }>`
  position: relative;
  z-index: 1;
  height: fit-content;

  ${({ $isOpen }) =>
    $isOpen &&
    `
filter: drop-shadow(0px 2px 10px #0000001a);
`}
`;

const Button = styled(DefaultButton)<{ $isActive: boolean }>`
  position: relative;
  padding: 20px 15px;

  display: flex;
  align-items: center;
  column-gap: 15px;

  border-radius: 8px;
  border: 1px solid transparent;
  background-color: #fff;

  width: 100%;

  cursor: pointer;
  user-select: none;

  ${({ $isActive }) =>
    $isActive &&
    `

    border-color: #E8E8E8;
    border-bottom: none;

    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    > svg {
     rotate: 180deg;
    }
`}

  > svg {
    flex-shrink: 0;
  }
`;

const Placeholder = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 50%;

  translate: 0 -50%;

  font-size: 14px;
  font-weight: 500;

  color: #868686;

  ${({ $isActive }) =>
    $isActive &&
    `
    top: 5px;
    font-size: 12px;
    translate: 0 0;
  `}
`;

const SelectedOption = styled.div`
  flex-grow: 1;
  height: 1lh;
  font-size: 18px;
  font-weight: 500;
`;

const StyledSelect = styled.select`
  display: none;
`;

const OptionsList = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  width: 100%;
  translate: 0 100%;

  border-radius: 8px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;

  border: 1px solid #e8e8e8;
  border-top: none;

  background-color: #fff;
`;

const OptionItem = styled(DefaultButton)`
  padding: 5px 15px;
  width: 100%;
  font-weight: 500;
`;

const FormSelect = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { options, placeholder, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <Wrapper onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
      <Button type='button' $isActive={isOpen}>
        <Placeholder $isActive={!!selectedOption}>{placeholder}</Placeholder>
        <SelectedOption>{selectedOption?.name}</SelectedOption>
        <ChevronDownIcon width={16} height={16} />
      </Button>
      {isOpen && (
        <OptionsList>
          {options.map((option, optionIndex) => (
            <OptionItem key={optionIndex} onClick={() => setSelectedOption(option)}>
              {option.name}
            </OptionItem>
          ))}
        </OptionsList>
      )}
      <StyledSelect ref={ref} {...rest}>
        {options.map((option, optionIndex) => (
          <option key={optionIndex} value={option.value}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
    </Wrapper>
  );
});

export default FormSelect;
