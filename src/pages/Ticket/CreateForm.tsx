import { FC, useEffect, useRef /* FormEventHandler */ } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { format as formatDate, getUnixTime /* fromUnixTime, setHours, setMinutes */ } from 'date-fns';

import useSWRMutation from 'swr/mutation';
import styled from 'styled-components';

import { Calendar } from 'vanilla-calendar-pro';
import { getDate } from 'vanilla-calendar-pro/utils';

import { apiFetcher } from '@/api/utils';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
// import MaskedInput from '@/components/MaskedInput';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import FileUploader from '@/components/ui/FileUploader';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

import CalendarIcon from '@icons/calendar.svg?react';

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

const CreateForm: FC = () => {
  const { trigger } = useSWRMutation('/ticket/', (endpoint, options: { arg: FormData }) =>
    apiFetcher<FormData>(endpoint, 'PUT', options.arg)
  );

  const { register, handleSubmit, setValue /* getValues */ } = useForm<FormData>({
    defaultValues: {
      screenshots: []
    }
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const eventDateCalendarRef = useRef<Calendar | null>(null);
  const eventDateInputRef = useRef<HTMLInputElement>(null);
  // const eventTimeInputRef = useRef<HTMLInputElement>(null);

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

  const submitHandler: SubmitHandler<FormData> = data => {
    trigger(data);
    navigate('/');
  };

  // const eventTimeInputHandler: FormEventHandler<HTMLInputElement> = event => {
  //   const inputValue = event.currentTarget.value;

  //   if (inputValue.length !== 5) {
  //     return;
  //   }

  //   const parsedTime = inputValue.split(':').map(Number);
  //   const newEventDate = setMinutes(
  //     setHours(fromUnixTime(getValues('eventDate') ?? getUnixTime(new Date())), parsedTime[0]),
  //     parsedTime[1]
  //   );

  //   setValue('eventDate', getUnixTime(newEventDate));
  //   eventDateInputRef.current!.value = formatDate(newEventDate, 'dd MMM yyyy');
  // };

  return (
    <Wrapper onSubmit={handleSubmit(submitHandler)}>
      <FormSection title='Applicant information'>
        <FormControl title='User name' control={<Input type='text' {...register('username', { required: true })} />} />
        <FormControl
          title='Contact information, position or department'
          control={<Input type='text' {...register('contactInfo', { required: true })} />}
        />
      </FormSection>
      <FormSection title='Event data'>
        <FormControl
          title='Event date'
          control={<Input ref={eventDateInputRef} type='text' icon={CalendarIcon} required />}
        />
        {/* <FormControl
          title='Event time'
          control={
            <MaskedInput
              ref={eventTimeInputRef}
              type='text'
              placeholder='hh:mm'
              maskOptions={{
                mask: 'xx:xx',
                replacement: {
                  x: /\d/
                }
              }}
              required
              onInput={eventTimeInputHandler}
            />
          }
        /> */}
        <FormControl
          title='User identification (ID or Email)'
          control={<Input type='text' {...register('userId', { required: true })} />}
        />
        <FormControl
          title='Company identification (ID or name)'
          control={<Input type='text' {...register('companyId', { required: true })} />}
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
              {...register('requestTopic', { required: true })}
            />
          }
        />
        <FormControl title='Device' control={<Input type='text' {...register('device', { required: true })} />} />
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
              {...register('browser', { required: true })}
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
              {...register('requestPriority', { required: true })}
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
              {...register('networkInfo', { required: true })}
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
              {...register('OS', { required: true })}
            />
          }
        />
        <FormControl
          title='Impact on work'
          control={<StyledTextArea rows={6} {...register('impactOnWork', { required: true })} />}
        />
      </FormSection>
      <FileUploader
        subtitle='Please upload file with the following format: png, jpg, jpeg, pdf'
        multiple
        accept='.png,.jpg,.jpeg,.pdf'
      />
      {searchParams.has('view') || searchParams.has('edit') ? (
        <FormSection>
          <FormControl title='Priority' control={<Input type='text' />} />
          <FormControl
            title='Answer rating'
            control={
              <Select
                options={[
                  { name: 'Group 1', value: 'group1', selected: true },
                  { name: 'Group 2', value: 'group2' }
                ]}
              />
            }
          />
          <FormControl title='Close ticket' control={<Checkbox type='checkbox' />} />
        </FormSection>
      ) : (
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
                {...register('expectedResolution', { required: true })}
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
                {...register('preferredContact', { required: true })}
              />
            }
          />
        </FormSection>
      )}
      {searchParams.has('view') || searchParams.has('edit') ? (
        <Buttons>
          <Button type='submit' $type='primary'>
            Save
          </Button>
          <Button type='submit' $type='black'>
            Apply
          </Button>
          <Button type='button' $type='bordered'>
            Reset
          </Button>
        </Buttons>
      ) : (
        <Buttons>
          <Button type='submit' $type='primary'>
            Send
          </Button>
          <Button type='button' $type='ghost' onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Buttons>
      )}
    </Wrapper>
  );
};

export default CreateForm;
