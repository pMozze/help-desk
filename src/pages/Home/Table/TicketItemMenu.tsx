import { FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { mutate } from 'swr';
import styled from 'styled-components';

import { apiFetcher } from '@/api/utils';

import EyeIcon from '@icons/eye.svg?react';
import EditIcon from '@icons/edit.svg?react';
import DeleteIcon from '@icons/delete.svg?react';

interface Props {
  ticketId: number;
  type: 'ticket' | 'request';
}

const TicketItemMenuWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const TicketItemMenuButton = styled.button<{ $isActive: boolean }>`
  && {
    display: flex;
    align-items: center;

    column-gap: 3px;
    aspect-ratio: 1;

    > div {
      flex-shrink: 0;

      width: 4px;
      height: 4px;

      border-radius: 100%;
      background-color: ${({ $isActive }) => ($isActive ? '#000' : '#717a81')};
    }
  }
`;

const TicketItemMenuItems = styled.div`
  padding-block: 10px;

  position: absolute;
  z-index: 1;
  translate: 0 100%;

  bottom: 0;
  right: 0;

  border-radius: 12px;
  border: 1px solid #e9e9e9;

  background-color: #fff;
  box-shadow: 0px 4px 15px 0px #00103d0f;
`;

const TicketItemMenuItemsButton = styled.button`
  && {
    padding: 10px 20px;
    width: 100%;

    display: flex;
    align-items: center;
    column-gap: 10px;

    font-size: 14px;
    color: #000000;

    &:hover,
    &:focus-visible {
      background-color: #f5fcf7;
    }
  }
`;

const TicketItemMenu: FC<Props> = ({ ticketId, type }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);
  const role = document.getElementById('help-desk')!.dataset.role;

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

  const onDeleteTicket = async () => {
    setIsOpen(false);
    await apiFetcher(`/ticket/${ticketId}/`, 'DELETE');
    await mutate('/ticket/');
  };

  return (
    <TicketItemMenuWrapper ref={dropdownWrapperRef}>
      <TicketItemMenuButton type='button' $isActive={isOpen} onClick={() => setIsOpen(true)}>
        <div></div>
        <div></div>
        <div></div>
      </TicketItemMenuButton>
      {isOpen && (
        <TicketItemMenuItems>
          <TicketItemMenuItemsButton
            type='button'
            onClick={() => navigate(`/${type === 'ticket' ? 'ticket' : 'requests'}/${ticketId}`)}
          >
            <EyeIcon />
            View
          </TicketItemMenuItemsButton>
          {role === 'support' && (
            <>
              <TicketItemMenuItemsButton
                type='button'
                onClick={() => navigate(`/${type === 'ticket' ? 'ticket' : 'requests'}/${ticketId}/?edit`)}
              >
                <EditIcon />
                Edit
              </TicketItemMenuItemsButton>
              <TicketItemMenuItemsButton type='button' onClick={onDeleteTicket}>
                <DeleteIcon />
                Delete
              </TicketItemMenuItemsButton>
            </>
          )}
        </TicketItemMenuItems>
      )}
    </TicketItemMenuWrapper>
  );
};

export default TicketItemMenu;
