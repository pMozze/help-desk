import { FC } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import styled from 'styled-components';

import { apiFetcher } from '@/api/utils';
import { Ticket } from '@/api/models';

import Header from './Header';
import CreateForm from './CreateForm';
import ViewForm from './ViewForm';

const Page = styled.div`
  padding: 25px 20px;
  background-color: #fff;
`;

const StyledHeader = styled(Header)`
  margin-bottom: 15px;
`;

const TicketPage: FC = () => {
  const { id } = useParams();
  const { data } = useSWR<Ticket, Error>(id ? `/ticket/${id}/` : null, apiFetcher);

  return (
    <Page>
      {id && data ? (
        <>
          <StyledHeader responsibleUserName={data!.responsibleUserName} status={data.status} />
          <ViewForm ticketId={id} defaultValues={{ ...data }} />
        </>
      ) : (
        <CreateForm />
      )}
    </Page>
  );
};

export default TicketPage;
