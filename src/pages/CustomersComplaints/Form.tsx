import { FC } from 'react';
import styled from 'styled-components';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

import CalendarIcon from '@icons/calendar.svg?react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const Form: FC = () => {
  return (
    <Wrapper>
      <FormSection title='Applicant information'>
        <FormControl title='User name' control={<Input type='text' />} />
        <FormControl title='Contact information, position or department' control={<Input type='text' />} />
      </FormSection>
      <FormSection title='Event data'>
        <FormControl title='Event date' control={<Input type='text' icon={CalendarIcon} />} />
        <FormControl title='Event time' control={<Input type='text' placeholder='hh:mm' />} />
        <FormControl title='User identification (ID or Email)' control={<Input type='text' />} />
        <FormControl title='Company identification (ID or name)' control={<Input type='text' />} />
      </FormSection>
      <FormSection title='Issue description'>
        <FormControl
          title='Request topic'
          control={
            <Select
              options={[
                { name: 'Group 1', value: 'group1' },
                { name: 'Group 2', value: 'group2' }
              ]}
            />
          }
        />
        <FormControl title='Device' control={<Input type='text' />} />
        <FormControl
          title='Browser'
          control={
            <Select
              options={[
                { name: 'Group 1', value: 'group1' },
                { name: 'Group 2', value: 'group2' }
              ]}
            />
          }
        />
        <FormControl
          title='Request priority'
          control={
            <Select
              options={[
                { name: 'Group 1', value: 'group1' },
                { name: 'Group 2', value: 'group2' }
              ]}
            />
          }
        />
        <FormControl
          title='Network information'
          control={
            <Select
              options={[
                { name: 'Group 1', value: 'group1' },
                { name: 'Group 2', value: 'group2' }
              ]}
            />
          }
        />
        <FormControl
          title='Operating system'
          control={
            <Select
              options={[
                { name: 'Group 1', value: 'group1' },
                { name: 'Group 2', value: 'group2' }
              ]}
            />
          }
        />
        <FormControl title='Impact on work' control={<Input type='text' />} />
        <FormControl title='Impact on work' control={<Input type='text' />} />
      </FormSection>
      <FormSection title='Expected support outcome'>
        <FormControl
          title='Expected resolution'
          control={
            <Select
              options={[
                { name: 'Group 1', value: 'group1' },
                { name: 'Group 2', value: 'group2' }
              ]}
            />
          }
        />
        <FormControl
          title='Preferred contact channel'
          control={
            <Select
              options={[
                { name: 'Group 1', value: 'group1' },
                { name: 'Group 2', value: 'group2' }
              ]}
            />
          }
        />
      </FormSection>
    </Wrapper>
  );
};

export default Form;
