import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { format as formatDate, fromUnixTime, getUnixTime } from 'date-fns';

import styled from 'styled-components';

import { Calendar } from 'vanilla-calendar-pro';
import { getDate } from 'vanilla-calendar-pro/utils';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

import CalendarIcon from '@icons/calendar.svg?react';

interface Props {
  ticketId: number;
  defaultValues: Partial<FormData>;
}

interface FormData {
  username: string;
  contactInfo: string;
  eventDate: number;
  userId: string;
  companyId: string;
  requestTopic: string;
  device: string;
  browser: string;
  requestPriority: string;
  networkInfo: string;
  OS: string;
  impactOnWork: string;
  expectedResolution: string;
  preferredContact: string;
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

const ViewForm: FC<Props> = ({ ticketId, defaultValues }) => {
  const { register, setValue } = useForm<FormData>({
    defaultValues
  });

  const navigate = useNavigate();
  const eventDateCalendarRef = useRef<Calendar | null>(null);
  const eventDateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (eventDateCalendarRef.current) {
      return;
    }

    const eventDateInput = eventDateInputRef.current!;
    eventDateInput.addEventListener('keydown', event => event.preventDefault());

    eventDateCalendarRef.current = new Calendar(eventDateInput, {
      inputMode: true,
      selectedTheme: 'light',
      onShow: self => {
        const inputWrapperRect = self.context.inputElement!.parentElement!.getBoundingClientRect();
        self.context.mainElement.style.top = inputWrapperRect.top + scrollY + inputWrapperRect.height + 'px';
        self.context.mainElement.style.left = inputWrapperRect.left + scrollX + 'px';
      },
      onClickDate: self => {
        const date = getDate(self.context.selectedDates[0]);
        setValue('eventDate', getUnixTime(date));

        self.context.inputElement!.value = formatDate(date, 'dd MMM yyyy');
        self.hide();
      }
    });

    eventDateCalendarRef.current.init();
  }, []);

  return (
    <Wrapper onSubmit={event => event.preventDefault()}>
      <FormSection title='Applicant information'>
        <FormControl title='User name' control={<Input type='text' {...register('username', { disabled: true })} />} />
        <FormControl
          title='Contact information, position or department'
          control={<Input type='text' {...register('contactInfo', { disabled: true })} />}
        />
      </FormSection>
      <FormSection title='Event data'>
        <FormControl
          title='Event date'
          control={
            <Input
              ref={eventDateInputRef}
              type='text'
              icon={CalendarIcon}
              required
              defaultValue={
                defaultValues?.eventDate && formatDate(fromUnixTime(defaultValues.eventDate), 'dd MMM yyyy')
              }
              disabled
            />
          }
        />
        <FormControl
          title='User identification (ID or Email)'
          control={<Input type='text' {...register('userId', { disabled: true })} />}
        />
        <FormControl
          title='Company identification (ID or name)'
          control={<Input type='text' {...register('companyId', { disabled: true })} />}
        />
      </FormSection>
      <FormSection title='Issue description'>
        <FormControl
          title='Request topic'
          control={
            <Select
              options={[
                { name: 'REQUEST_TOPIC1', value: 'REQUEST_TOPIC1', selected: true },
                { name: 'REQUEST_TOPIC2', value: 'REQUEST_TOPIC2' },
                { name: 'Other', value: 'Other' }
              ]}
              {...register('requestTopic', { disabled: true })}
            />
          }
        />
        <FormControl title='Device' control={<Input type='text' {...register('device', { disabled: true })} />} />
        <FormControl
          title='Browser'
          control={
            <Select
              options={[
                { name: 'Chrome', value: 'Chrome', selected: true },
                { name: 'Firefox', value: 'Firefox' },
                { name: 'Edge', value: 'Edge' },
                { name: 'Safari', value: 'Safari' },
                { name: 'Other', value: 'Other' }
              ]}
              {...register('browser', { disabled: true })}
            />
          }
        />
        <FormControl
          title='Request priority'
          control={
            <Select
              options={[
                { name: 'Low', value: 'Low', selected: true },
                { name: 'Medium', value: 'Medium' },
                { name: 'High', value: 'High' },
                { name: 'Critical', value: 'Critical' }
              ]}
              {...register('requestPriority', { disabled: true })}
            />
          }
        />
        <FormControl
          title='Network information'
          control={
            <Select
              options={[
                { name: 'WiFi', value: 'WiFi', selected: true },
                { name: 'Ethernet', value: 'Ethernet' },
                { name: 'Mobile', value: 'Mobile' },
                { name: 'Other', value: 'Other' }
              ]}
              {...register('networkInfo', { disabled: true })}
            />
          }
        />
        <FormControl
          title='Operating system'
          control={
            <Select
              options={[
                { name: 'Windows', value: 'Windows', selected: true },
                { name: 'macOS', value: 'macOS' },
                { name: 'Linux', value: 'Linux' },
                { name: 'Other', value: 'Other' }
              ]}
              {...register('OS', { disabled: true })}
            />
          }
        />
        <FormControl
          title='Impact on work'
          control={<StyledTextArea rows={6} {...register('impactOnWork', { disabled: true })} />}
        />
      </FormSection>
      <iframe
        src={`https://bx-dev.swrpro.com/helpdesk/iframe.php?IFRAME=Y&ID=${ticketId}`}
        style={{ border: 'none' }}
      ></iframe>
      <FormSection title='Expected support outcome'>
        <FormControl
          title='Expected resolution'
          control={
            <Select
              options={[
                { name: 'Immediate', value: 'Immediate', selected: true },
                { name: 'Soon', value: 'Soon' },
                { name: 'No Rush', value: 'No Rush' }
              ]}
              {...register('expectedResolution', { disabled: true })}
            />
          }
        />
        <FormControl
          title='Preferred contact channel'
          control={
            <Select
              options={[
                { name: 'Email', value: 'Email', selected: true },
                { name: 'Phone', value: 'Phone' },
                { name: 'Chat', value: 'Chat' }
              ]}
              {...register('preferredContact', { disabled: true })}
            />
          }
        />
      </FormSection>
      <Buttons>
        <Button type='button' $type='bordered' onClick={() => navigate('/')}>
          Back
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default ViewForm;
