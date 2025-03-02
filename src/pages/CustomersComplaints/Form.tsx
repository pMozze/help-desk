import { FC } from 'react';
import styled from 'styled-components';

import FormSection from './FormSection';
import Input from './Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 40px;
  margin-top: 40px;
`;

const Form: FC = () => {
  return (
    <Wrapper>
      <FormSection title='Applicant information'>
        <Input placeholder='User name' />
      </FormSection>
      <FormSection title='Event data'></FormSection>
      <FormSection title='Issue description'>123</FormSection>
      <FormSection title='Expected support outcome'>123</FormSection>
    </Wrapper>
  );
};

export default Form;
