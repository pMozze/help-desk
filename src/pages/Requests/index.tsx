import { FC } from 'react';
import { useParams } from 'react-router';

import useSWR from 'swr';
import styled from 'styled-components';

import Header from './Header';
import CreateForm from './CreateForm';
import ViewForm from './ViewForm';

import { apiFetcher } from '@/api/utils';

import { Ticket } from '@/api/models';

const Page = styled.div`
  padding: 25px 20px;
  background-color: #fff;
`;

const StyledHeader = styled(Header)`
  margin-bottom: 15px;
`;

const RequestsPage: FC = () => {
  const { id } = useParams();
  const { data, isValidating } = useSWR<
    Pick<
      Ticket,
      | 'name'
      | 'description'
      | 'screenshots'
      | 'responsibleGroupId'
      | 'responsibleUserId'
      | 'responsibleUserName'
      | 'service'
      | 'status'
    >,
    Error
  >(id ? `/ticket/${id}/` : null, apiFetcher);

  return (
    <Page>
      {id && data && !isValidating ? (
        <>
          <StyledHeader responsibleUserName={data.responsibleUserName} status={data.status} />
          <ViewForm requestId={id} defaultValues={data} />
        </>
      ) : (
        <CreateForm />
      )}
    </Page>
  );
};

export default RequestsPage;
