import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { format as formatDate, fromUnixTime as dateFromUnixTime } from 'date-fns';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable
} from '@tanstack/react-table';

import { TicketsItem } from '@/api/models';
import { useTableFiltersStore } from './TableFiltersStore';

import Badge from '@/components/ui/Badge';
import TicketItemMenu from './TicketItemMenu';

import SortIcon from '@icons/sort.svg?react';

interface Props {
  items: TicketsItem[];
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th<{ $canBeSorted?: boolean }>`
  padding: 15px 20px;
  font-weight: 500;
  text-align: left;

  > div {
    display: flex;
    align-items: center;
    column-gap: 2.5px;

    > svg {
      cursor: pointer;
      user-select: none;
    }
  }

  ${({ $canBeSorted }) =>
    $canBeSorted &&
    `
    cursor: pointer;
    user-select: none;
  `}
`;

const StyledTd = styled.td<{ $variant: 'default' | 'bold' }>`
  padding: 10px 20px;
  color: #717a81;

  ${({ $variant }) =>
    $variant === 'bold' &&
    `
    font-weight: 500;
    color: #000;
  `}
`;

const StyledSortIcon = styled(SortIcon)<{ $direction: false | SortDirection }>`
  ${({ $direction }) => {
    switch ($direction) {
      case 'asc':
        return `> path:nth-child(2) {
          display: none;
        }`;

      case 'desc':
        return `> path:nth-child(1) {
          display: none;
        }`;

      default:
        break;
    }
  }}
`;

const columnHelper = createColumnHelper<TicketsItem>();

const columns = [
  columnHelper.accessor('lastModifiedAt', {
    header: 'Modified',
    cell: cellContext => formatDate(dateFromUnixTime(cellContext.getValue()), 'dd MMM, yyyy')
  }),
  columnHelper.accessor('type', {
    header: 'Type of Request',
    cell: cellContext => cellContext.getValue()
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: cellContext => cellContext.getValue()
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: cellContext => {
      switch (cellContext.getValue()) {
        case 'CREATED':
          return <Badge text='Created' variant='danger' />;

        case 'ASSIGNED':
          return <Badge text='Assigned' variant='warning' />;

        case 'IN_PROGRESS':
          return <Badge text='In progress' variant='info' />;

        case 'CLOSED':
          return <Badge text='Closed' variant='success' />;
      }
    }
  }),
  columnHelper.display({
    id: 'menu',
    cell: cellContext => (
      <TicketItemMenu
        ticketId={cellContext.cell.row.original.id}
        type={cellContext.cell.row.original.title ? 'request' : 'ticket'}
      />
    )
  })
];

const Table: FC<Props> = ({ items }) => {
  const { status, type } = useTableFiltersStore();

  const filtredItems = useMemo(() => {
    let result = items;

    if (status !== 'all') {
      result = items.filter(item => item.status === status);
    }

    if (type !== 'all') {
      result = items.filter(item => item.type === type);
    }

    return result;
  }, [items, status, type]);

  const table = useReactTable({
    columns,
    data: filtredItems,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <StyledTable>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <StyledTh key={header.id} $canBeSorted={header.column.getCanSort()}>
                <div onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && <StyledSortIcon $direction={header.column.getIsSorted()} />}
                </div>
              </StyledTh>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <StyledTd key={cell.id} $variant={cell.column.id === 'title' ? 'bold' : 'default'}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </StyledTd>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
