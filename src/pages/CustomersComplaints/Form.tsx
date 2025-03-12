import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { format as formatDate } from 'date-fns';

import { Calendar } from 'vanilla-calendar-pro';
import { getDate } from 'vanilla-calendar-pro/utils';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import MaskedInput from '@/components/MaskedInput';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

import CalendarIcon from '@icons/calendar.svg?react';

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
  const eventDateCalendarRef = useRef<Calendar | null>(null);
  const eventDateInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (eventDateCalendarRef.current) {
      return;
    }

    eventDateCalendarRef.current = new Calendar(eventDateInputRef.current!, {
      inputMode: true,
      selectedTheme: 'light',
      onShow: self => {
        const inputWrapperRect = self.context.inputElement!.parentElement!.getBoundingClientRect();
        self.context.mainElement.style.top = inputWrapperRect.top + scrollY + inputWrapperRect.height + 'px';
        self.context.mainElement.style.left =
          inputWrapperRect.left + (inputWrapperRect.left + scrollY) / 2 - inputWrapperRect.width / 2 + 'px';
      },
      onClickDate: self => {
        const date = getDate(self.context.selectedDates[0]);
        self.context.inputElement!.value = formatDate(date, 'dd MMM yyyy');
        self.hide();
      }
    });

    eventDateCalendarRef.current.init();
  }, []);

  return (
    <Wrapper>
      <FormSection title='Applicant information'>
        <FormControl title='User name' control={<Input type='text' />} />
        <FormControl title='Contact information, position or department' control={<Input type='text' />} />
      </FormSection>
      <FormSection title='Event data'>
        <FormControl
          title='Event date'
          control={<Input ref={eventDateInputRef} type='text' icon={CalendarIcon} readOnly />}
        />
        <FormControl
          title='Event time'
          control={
            <MaskedInput
              type='text'
              placeholder='hh:mm'
              maskOptions={{
                mask: 'xx:xx',
                replacement: {
                  x: /\d/
                }
              }}
            />
          }
        />
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
        <FormControl title='Impact on work' control={<StyledTextArea rows={6} />} />
        <FormControl title='Impact on work' control={<StyledTextArea rows={6} />} />
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
