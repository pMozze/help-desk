import { FC } from 'react';
import { useParams } from 'react-router';

import useSWR from 'swr';
import styled from 'styled-components';

import CreateForm from './CreateForm';
import ViewForm from './ViewForm';

import { apiFetcher } from '@/api/utils';

import { Ticket } from '@/api/models';

const Page = styled.div`
  padding: 25px 20px;
  background-color: #fff;
`;

const RequestsPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR<Pick<Ticket, 'name' | 'description' | 'screenshots'>, Error>(
    id ? `/ticket/${id}/` : null,
    apiFetcher
  );

  if (isLoading || error) {
    return;
  }

  return <Page>{id === undefined ? <CreateForm /> : <ViewForm requestId={Number(id)} defaultValues={data!} />}</Page>;
};

export default RequestsPage;
