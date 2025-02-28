import { FC } from 'react';
import styled from 'styled-components';

import Badge from '@/components/ui/Badge';

import SortIcon from '@icons/sort.svg?react';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

const StyledTh = styled.th`
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

const Table: FC = () => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTh>
            <div>
              Modified <SortIcon />
            </div>
          </StyledTh>
          <StyledTh>
            <div>
              Type of Request <SortIcon />
            </div>
          </StyledTh>
          <StyledTh>
            <div>
              Title <SortIcon />
            </div>
          </StyledTh>
          <StyledTh>
            <div>
              Status <SortIcon />
            </div>
          </StyledTh>
          <StyledTh></StyledTh>
        </tr>
      </thead>
      <tbody>
        <tr>
          <StyledTd $variant='default'>19 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Requests from company employees</StyledTd>
          <StyledTd $variant='bold'>Issue with internal tools</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Submitted' variant='warning' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
        <tr>
          <StyledTd $variant='default'>19 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Requests from the technical department for work and incidents</StyledTd>
          <StyledTd $variant='bold'>Software update required</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Submitted' variant='warning' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
        <tr>
          <StyledTd $variant='default'>15 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Customers complaints</StyledTd>
          <StyledTd $variant='bold'>Issue with product delivery</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Rejected by Supervisor' variant='danger' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
        <tr>
          <StyledTd $variant='default'>18 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Requests from company employees</StyledTd>
          <StyledTd $variant='bold'>Request for new software</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Revoked' variant='success' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
        <tr>
          <StyledTd $variant='default'>14 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Requests from the technical department for work and incidents</StyledTd>
          <StyledTd $variant='bold'>System maintenance request</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Revoked' variant='success' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
        <tr>
          <StyledTd $variant='default'>14 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Customers complaints</StyledTd>
          <StyledTd $variant='bold'>Request for refund</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Revoked' variant='success' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
        <tr>
          <StyledTd $variant='default'>14 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Requests from the technical department for work and incidents</StyledTd>
          <StyledTd $variant='bold'>Incident report: server downtime</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Revoked' variant='success' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
        <tr>
          <StyledTd $variant='default'>14 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Requests from company employees</StyledTd>
          <StyledTd $variant='bold'>Access request to internal system</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Revoked' variant='success' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
        <tr>
          <StyledTd $variant='default'>14 Dec, 2020</StyledTd>
          <StyledTd $variant='default'>Customers complaints</StyledTd>
          <StyledTd $variant='bold'>Complaint about service quality</StyledTd>
          <StyledTd $variant='default'>
            <Badge text='Revoked' variant='success' />
          </StyledTd>
          <StyledTd $variant='default'>...</StyledTd>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default Table;
