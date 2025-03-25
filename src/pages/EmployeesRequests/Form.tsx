import { FC } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

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

const Form: FC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <FormSection title='Applicant information'>
        <FormControl title='Name' control={<Input type='text' />} />
        <FormControl title='Text' control={<StyledTextArea rows={6} />} />
      </FormSection>
      <Buttons>
        <Button type='submit' $type='primary'>
          Send
        </Button>
        <Button type='button' $type='ghost' onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default Form;
