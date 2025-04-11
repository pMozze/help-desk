import { FC } from 'react';
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

import { WikiPage } from '@/api/models';

import SortIcon from '@icons/sort.svg?react';

interface Props {
  items: WikiPage[];
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

const StyledTd = styled.td<{ $variant: 'default' | 'bold'; $clickable: boolean }>`
  padding: 10px 20px;
  color: #717a81;

  ${({ $variant }) =>
    $variant === 'bold' &&
    `
    font-weight: 500;
    color: #000;
  `}

  ${({ $clickable }) =>
    $clickable &&
    `
    cursor: pointer;
    user-select: none;
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

const columnHelper = createColumnHelper<WikiPage>();

const columns = [
  columnHelper.accessor('createdAt', {
    header: 'Created',
    cell: cellContext => formatDate(dateFromUnixTime(cellContext.getValue()), 'dd MMM, yyyy')
  }),
  columnHelper.accessor('modifiedAt', {
    header: 'Modified',
    cell: cellContext => formatDate(dateFromUnixTime(cellContext.getValue()), 'dd MMM, yyyy')
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: cellContext => cellContext.getValue()
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: cellContext => cellContext.getValue()
  })
];

const Table: FC<Props> = ({ items }) => {
  const table = useReactTable({
    columns,
    data: items,
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
              <StyledTd
                key={cell.id}
                $variant={cell.column.id === 'name' ? 'bold' : 'default'}
                $clickable={cell.column.id !== 'menu'}
                onClick={() => window.open(cell.row.original.url, '_blank')}
              >
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
