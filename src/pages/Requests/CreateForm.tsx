import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useSWRMutation from 'swr/mutation';
import styled from 'styled-components';

import { apiFetcher } from '@/api/utils';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  description: string;
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
  const { register, handleSubmit } = useForm<FormData>();

  const { trigger } = useSWRMutation('/ticket/', (endpoint, options: { arg: globalThis.FormData }) =>
    apiFetcher<globalThis.FormData>(endpoint, 'PUT', options.arg)
  );

  const submitHandler: SubmitHandler<FormData> = data => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);

    trigger(formData);
    navigate('/');
  };

  return (
    <Wrapper onSubmit={handleSubmit(submitHandler)}>
      <FormSection title='Applicant information'>
        <FormControl title='Name' control={<Input type='text' {...register('name', { required: true })} />} />
        <FormControl
          title='Description'
          control={<StyledTextArea rows={6} {...register('description', { required: true })} />}
        />
      </FormSection>
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
