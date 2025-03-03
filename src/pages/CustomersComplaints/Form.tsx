import { FC } from 'react';
import styled from 'styled-components';

import FormSection from './FormSection';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import FormSelect from '@/components/ui/FormSelect';

import CalendarIcon from '@icons/calendar.svg?react';
import ClockIcon from '@icons/clock.svg?react';

import Button from '@/components/ui/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 40px;
  margin-top: 40px;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 15px;
  margin-top: 60px;
`;

const Form: FC = () => {
  return (
    <>
      <Wrapper>
        <FormSection title='Applicant information'>
          <FormInput type='text' placeholder='User name' />
          <FormTextarea rows={3} placeholder='Contact Information, position, or department' />
        </FormSection>
        <FormSection title='Event data'>
          <FormInput type='text' placeholder='Event date' icon={CalendarIcon} />
          <FormInput type='text' placeholder='Event time' icon={ClockIcon} />
          <FormInput type='text' placeholder='User identification (ID or Email)' />
          <FormInput type='text' placeholder='Company identification (ID or name)' />
        </FormSection>
        <FormSection title='Issue description'>
          <FormSelect
            options={[
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' }
            ]}
            placeholder='Request topic'
          />
          <FormTextarea rows={3} placeholder='Issue description' />
          <FormInput type='text' placeholder='Device' />
          <FormSelect
            options={[
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' }
            ]}
            placeholder='Operating system'
          />
          <FormSelect
            options={[
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' }
            ]}
            placeholder='Browser'
          />
          <FormSelect
            options={[
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' }
            ]}
            placeholder='Network information'
          />
          <FormSelect
            options={[
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' }
            ]}
            placeholder='Request priority'
          />
          <FormInput type='text' placeholder='Impact on work' />
        </FormSection>
        <FormSection title='Expected support outcome'>
          <FormSelect
            options={[
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' }
            ]}
            placeholder='Excepted resolution'
          />
          <FormSelect
            options={[
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' },
              { name: 'Test 1', value: 'test1' }
            ]}
            placeholder='Preferred contact channel'
          />
        </FormSection>
      </Wrapper>
      <ButtonsRow>
        <Button type='button' $type='tertiary' $size='large'>
          Cancel
        </Button>
        <Button type='submit' $type='primary' $size='large'>
          Create
        </Button>
      </ButtonsRow>
    </>
  );
};

export default Form;
