import { FC } from 'react';
import { useSearchParams } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiFetcher } from '@/api/utils';
import { Option } from '@/api/models';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import Chat from '@/components/Chat';
import FileUploader from '@/components/ui/FileUploader';
import Button from '@/components/ui/Button';

interface Props {
  requestId: number;
  defaultValues: FormData;
}

interface FormData {
  name: string;
  description: string;
  screenshots: {
    name: string;
    url: string;
  }[];
  responsibleGroupId: string;
  responsibleUserId: string;
  responsibleUserName: string;
  service: string;
  status: string;
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const StyledTextArea = styled(TextArea)`
  flex-grow: 1;
`;

const Buttons = styled.div`
  display: flex;
  column-gap: 15px;
`;

const ViewForm: FC<Props> = ({ requestId, defaultValues }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const role = document.getElementById('help-desk')!.dataset.role;
  const { data: usersData } = useSWR<Option[]>('/users/', apiFetcher);
  const { data: groupsData } = useSWR<Option[]>('/groups/', apiFetcher);

  const { trigger } = useSWRMutation(`/ticket/${requestId}/`, (endpoint, options: { arg: FormData }) =>
    apiFetcher<FormData>(endpoint, 'PATCH', options.arg)
  );

  const { register, setValue, handleSubmit } = useForm<FormData>({
    defaultValues
  });

  const userOptions =
    usersData?.map(option => ({
      name: option.name,
      value: option.value,
      selected: option.value == defaultValues.responsibleUserId
    })) ?? [];
  const groupOptions =
    groupsData?.map(option => ({
      name: option.name,
      value: option.value,
      selected: option.value == defaultValues.responsibleGroupId
    })) ?? [];

  const submitHandler: SubmitHandler<FormData> = data => {
    trigger(data);
    navigate('/');
  };

  return (
    <Wrapper onSubmit={handleSubmit(submitHandler)}>
      <FormSection title='Applicant information'>
        <FormControl
          title='Name'
          control={<Input type='text' {...register('name', { disabled: !searchParams.has('edit') })} />}
        />
        <FormControl
          title='Description'
          control={<StyledTextArea rows={6} {...register('description', { disabled: !searchParams.has('edit') })} />}
        />
      </FormSection>
      <Chat id={requestId} />
      {defaultValues.screenshots && defaultValues.screenshots.length > 0 && (
        <FileUploader
          subtitle='Please upload file with the following format: png, jpg, jpeg, pdf'
          multiple
          accept='.png,.jpg,.jpeg,.pdf'
          disabled
          defaultFiles={defaultValues.screenshots?.map(file => ({
            name: file.name,
            url: import.meta.env.VITE_URL + file.url
          }))}
        />
      )}
      {role === 'support' && (
        <FormSection title='Support info'>
          <FormControl
            title='Responsible group'
            control={
              <Select
                options={groupOptions}
                {...register('responsibleGroupId', { disabled: !searchParams.has('edit') })}
                onSelect={option => setValue('responsibleGroupId', option.value)}
              />
            }
          />
          <FormControl
            title='Responsible user'
            control={
              <Select
                options={userOptions}
                {...register('responsibleUserId', { disabled: !searchParams.has('edit') })}
                onSelect={option => setValue('responsibleUserId', option.value)}
              />
            }
          />
          <FormControl
            title='Service'
            control={
              <Select
                options={[
                  { name: 'Email', value: 'Email' },
                  { name: 'SIP phone', value: 'SIP phone' },
                  { name: 'Network hardware', value: 'Network hardware' },
                  { name: 'Servers', value: 'Servers' },
                  { name: 'Company Services', value: 'Company Services' },
                  { name: 'New user request', value: 'New user request' }
                ].map(option => ({ ...option, selected: option.value === defaultValues.service }))}
                {...register('service', { disabled: !searchParams.has('edit') })}
                onSelect={option => setValue('service', option.value)}
              />
            }
          />
          <FormControl
            title='Status'
            control={
              <Select
                options={[
                  { name: 'Created', value: 'CREATED' },
                  { name: 'Assigned', value: 'ASSIGNED' },
                  { name: 'In progress', value: 'IN_PROGRESS' },
                  { name: 'Closed', value: 'CLOSED' }
                ].map(option => ({ ...option, selected: option.value === defaultValues.status }))}
                {...register('status', { disabled: !searchParams.has('edit') })}
                onSelect={option => setValue('status', option.value)}
              />
            }
          />
        </FormSection>
      )}
      <Buttons>
        {searchParams.has('edit') && (
          <Button type='submit' $type='primary'>
            Apply
          </Button>
        )}
        <Button type='button' $type='bordered' onClick={() => navigate('/')}>
          Back
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default ViewForm;
