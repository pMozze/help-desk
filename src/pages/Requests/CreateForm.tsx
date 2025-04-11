import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import useSWRMutation from 'swr/mutation';
import styled from 'styled-components';
import { match } from 'ts-pattern';

import { apiFetcher } from '@/api/utils';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import FileUploader from '@/components/ui/FileUploader';
import Button from '@/components/ui/Button';

interface FormData {
  createdById: string;
  type: string;
  name: string;
  description: string;
  screenshots: [];
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

const CreateForm: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const resolvedType = match(typeParam)
    .with('employees', () => 'Requests from company employees')
    .with('tech', () => 'Requests from the technical department for work and incidents')
    .otherwise(() => 'Requests from company employees');

  const { register, handleSubmit } = useForm<FormData>();

  const { trigger } = useSWRMutation('/ticket/', (endpoint, options: { arg: globalThis.FormData }) =>
    apiFetcher<globalThis.FormData>(endpoint, 'PUT', options.arg)
  );

  const submitHandler: SubmitHandler<FormData> = data => {
    const formData = new FormData();
    formData.append('createdById', document.getElementById('help-desk')!.dataset['user-id'] ?? '1');
    formData.append('name', data.name);
    formData.append('type', resolvedType);
    formData.append('description', data.description);
    formData.append('description', data.description);

    for (const file of data.screenshots) {
      formData.append('screenshots[]', file);
    }

    trigger(formData);
    navigate('/');
  };

  return (
    <Wrapper onSubmit={handleSubmit(submitHandler)}>
      <FormSection title='Applicant information'>
        <FormControl title='Name' control={<Input type='text' {...register('name', { required: false })} />} />
        <FormControl
          title='Description'
          control={<StyledTextArea cols={100} rows={6} {...register('description', { required: true })} />}
        />
      </FormSection>
      <FileUploader
        subtitle='Please upload file with the following format: png, jpg, jpeg, pdf'
        multiple
        accept='.png,.jpg,.jpeg,.pdf'
        {...register('screenshots', { required: false })}
      />
      <Buttons>
        <Button type='submit' $type='primary'>
          Send
        </Button>
        <Button type='button' $type='bordered' onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default CreateForm;
