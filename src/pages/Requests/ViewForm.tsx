import { FC } from 'react';
import { useSearchParams } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useSWRMutation from 'swr/mutation';

import { apiFetcher } from '@/api/utils';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

interface Props {
  requestId: number;
  defaultValues: FormData;
}

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

const ViewForm: FC<Props> = ({ requestId, defaultValues }) => {
  console.log(defaultValues);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { trigger } = useSWRMutation(`/ticket/${requestId}/`, (endpoint, options: { arg: FormData }) =>
    apiFetcher<FormData>(endpoint, 'PATCH', options.arg)
  );

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues
  });

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
      <Buttons>
        {searchParams.has('edit') && (
          <Button type='submit' $type='primary'>
            Apple
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
