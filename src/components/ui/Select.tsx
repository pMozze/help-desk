import { forwardRef, ComponentPropsWithoutRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import DefaultButton from './DefaultButton';
import ChevronDownIcon from '@icons/chevron-down.svg?react';

type Option = {
  name: string;
  value: string;
};

interface Props extends ComponentPropsWithoutRef<'select'> {
  options: Option[];
}

const Wrapper = styled.div`
  position: relative;
  min-width: 250px;
  height: fit-content;
`;

const Button = styled(DefaultButton)`
  padding: 10px 10px 10px 20px;

  display: flex;
  align-items: center;
  column-gap: 15px;

  font-size: 14px;
  line-height: 16px;

  border-radius: 8px;
  border: 1px solid #dadada;

  color: #000;
  background-color: #fff;

  width: 100%;

  cursor: pointer;
  user-select: none;

  > svg {
    flex-shrink: 0;
    color: #dadada;
  }
`;

const SelectedOption = styled.div`
  flex-grow: 1;
  height: 1lh;
`;

const StyledSelect = styled.select`
  display: none;
`;

const OptionsList = styled.div`
  padding-block: 10px;

  position: absolute;
  z-index: 1;

  bottom: 0;
  right: 0;

  width: 100%;
  translate: 0 calc(100% + 2px);

  border-radius: 8px;
  background-color: #fff;
`;

const OptionItem = styled(DefaultButton)`
  width: 100%;
  padding: 5px 20px;

  font-size: 14px;
  line-height: 16px;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const Select = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { options, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const onSelect = useCallback((option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  }, []);

  return (
    <Wrapper>
      <Button type='button' onClick={() => setIsOpen(!isOpen)}>
        <SelectedOption>{selectedOption?.name}</SelectedOption>
        <ChevronDownIcon width={16} height={16} />
      </Button>
      {isOpen && (
        <OptionsList>
          {options.map((option, optionIndex) => (
            <OptionItem
              key={optionIndex}
              onClick={event => {
                onSelect(option);
                event.preventDefault();
              }}
            >
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

export default Select;
