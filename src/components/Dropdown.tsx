import { FC, useState, useCallback, SVGProps, useEffect, useRef } from 'react';
import styled from 'styled-components';

import ChevronDownIcon from '@icons/chevron-down.svg?react';

type Item = {
  name: string;
  value: string;
  defaultSelected?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
};

interface Props {
  label?: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button<{ $isActive: boolean }>`
  && {
    padding: 4px 12px;
    min-width: 115px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #f3f3f3;
    border-radius: 9999px;

    ${({ $isActive }) =>
      $isActive &&
      `
    > svg {
      rotate: 180deg;
    }
  `}
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 100%;

  bottom: 0;
  left: 0;

  padding-block: 10px;
  border-radius: 12px;

  background-color: #fff;
  border: 1px solid #e9e9e9;

  translate: 0 calc(100% + 10px);
`;

const DropdownItem = styled.button`
  && {
    padding-block: 10px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    column-gap: 10px;
    font-size: 14px;
    line-height: 1;

    &:hover {
      background-color: #f5fcf7;
    }
  }
`;

const Label = styled.span`
  font-weight: 500;
`;

const Dropdown: FC<Props> = ({ label, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickHandler = (event: MouseEvent) => {
      if (!event.composedPath().includes(dropdownWrapperRef.current!)) {
        setIsOpen(false);
      }
    };

    const onScrollHandler = () => {
      setIsOpen(false);
    };

    document.addEventListener('click', onClickHandler);
    document.addEventListener('scroll', onScrollHandler);

    return () => {
      document.removeEventListener('click', onClickHandler);
      document.removeEventListener('scroll', onScrollHandler);
    };
  }, []);

  const onItemSelect = useCallback((item: Item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect && onSelect(item);
  }, []);

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <DropdownWrapper ref={dropdownWrapperRef}>
        <DropdownButton type='button' onClick={() => setIsOpen(value => !value)} $isActive={isOpen}>
          {selectedItem ? selectedItem.name : items[0].name}
          <ChevronDownIcon />
        </DropdownButton>
        {isOpen && (
          <DropdownMenu>
            {items.map((item, itemIndex) => (
              <DropdownItem key={itemIndex} onClick={() => onItemSelect(item)}>
                {item.icon && <item.icon />}
                {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownWrapper>
    </Wrapper>
  );
};

export default Dropdown;
