import { FC, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { format as formatDate, fromUnixTime, getUnixTime } from 'date-fns';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import styled from 'styled-components';

import { Calendar } from 'vanilla-calendar-pro';
import { getDate } from 'vanilla-calendar-pro/utils';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import Chat from '@/components/Chat';
import FileUploader from '@/components/ui/FileUploader';
import Button from '@/components/ui/Button';

import { apiFetcher } from '@/api/utils';
import { Option } from '@/components/ui/Select';

import CalendarIcon from '@icons/calendar.svg?react';

interface Props {
  ticketId: string | number;
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
  screenshots: {
    name: string;
    url: string;
  }[];
  responsibleGroupId: string;
  responsibleUserId: string;
  responsibleUserName: string;
  service: string;
  status: string;
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
  const role = document.getElementById('help-desk')!.dataset.role;
  const [searchParams] = useSearchParams();

  const { data: usersData, isValidating: isUsersValidating } = useSWR<Option[]>('/users/', apiFetcher);
  const { data: groupsData, isValidating: isGroupsValidating } = useSWR<Option[]>('/groups/', apiFetcher);

  const { trigger } = useSWRMutation(
    `/ticket/${ticketId}/`,
    (endpoint: string, options: { arg: Partial<Omit<FormData, 'screenshots'>> }) =>
      apiFetcher<Partial<Omit<FormData, 'screenshots'>>>(endpoint, 'PATCH', options.arg)
  );

  const { register, setValue, handleSubmit } = useForm<FormData>({
    defaultValues
  });

  const navigate = useNavigate();
  const eventDateCalendarRef = useRef<Calendar | null>(null);
  const eventDateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (eventDateCalendarRef.current || !eventDateInputRef.current) {
      return;
    }

    const eventDateInput = eventDateInputRef.current;
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
    const { screenshots, ...newData } = data;
    trigger(newData);
    navigate('/');
  };

  if (!usersData || isUsersValidating || !groupsData || isGroupsValidating) {
    return;
  }

  return (
    <Wrapper onSubmit={handleSubmit(submitHandler)}>
      <FormSection title='Applicant information'>
        <FormControl
          title='User name'
          control={<Input type='text' {...register('username', { disabled: !searchParams.has('edit') })} />}
        />
        <FormControl
          title='Contact information, position or department'
          control={<Input type='text' {...register('contactInfo', { disabled: !searchParams.has('edit') })} />}
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
          control={<Input type='text' {...register('userId', { disabled: !searchParams.has('edit') })} />}
        />
        <FormControl
          title='Company identification (ID or name)'
          control={<Input type='text' {...register('companyId', { disabled: !searchParams.has('edit') })} />}
        />
      </FormSection>
      <FormSection title='Issue description'>
        <FormControl
          title='Request topic'
          control={
            <Select
              options={[
                { name: 'Group', value: 'Group' },
                { name: 'Subgroup', value: 'Subgroup' }
              ].map(option => ({ ...option, selected: option.value === defaultValues.requestTopic }))}
              {...register('requestTopic', { disabled: !searchParams.has('edit') })}
              onSelect={option => setValue('requestTopic', option.value)}
            />
          }
        />
        <FormControl
          title='Device'
          control={<Input type='text' {...register('device', { disabled: !searchParams.has('edit') })} />}
        />
        <FormControl
          title='Browser'
          control={
            <Select
              options={[
                { name: 'Chrome', value: 'Chrome' },
                { name: 'Firefox', value: 'Firefox' },
                { name: 'Edge', value: 'Edge' },
                { name: 'Safari', value: 'Safari' },
                { name: 'Other', value: 'Other' }
              ].map(option => ({ ...option, selected: option.value === defaultValues.browser }))}
              {...register('browser', { disabled: !searchParams.has('edit') })}
              onSelect={option => setValue('browser', option.value)}
            />
          }
        />
        <FormControl
          title='Request priority'
          control={
            <Select
              options={[
                { name: 'Low', value: 'Low' },
                { name: 'Medium', value: 'Medium' },
                { name: 'High', value: 'High' },
                { name: 'Critical', value: 'Critical' }
              ].map(option => ({ ...option, selected: option.value === defaultValues.requestPriority }))}
              {...register('requestPriority', { disabled: !searchParams.has('edit') })}
              onSelect={option => setValue('requestPriority', option.value)}
            />
          }
        />
        <FormControl
          title='Network information'
          control={
            <Select
              options={[
                { name: 'WiFi', value: 'WiFi' },
                { name: 'Ethernet', value: 'Ethernet' },
                { name: 'Mobile', value: 'Mobile' },
                { name: 'Other', value: 'Other' }
              ].map(option => ({ ...option, selected: option.value === defaultValues.networkInfo }))}
              {...register('networkInfo', { disabled: !searchParams.has('edit') })}
              onSelect={option => setValue('networkInfo', option.value)}
            />
          }
        />
        <FormControl
          title='Operating system'
          control={
            <Select
              options={[
                { name: 'Windows', value: 'Windows' },
                { name: 'macOS', value: 'macOS' },
                { name: 'Linux', value: 'Linux' },
                { name: 'Other', value: 'Other' }
              ].map(option => ({ ...option, selected: option.value === defaultValues.OS }))}
              {...register('OS', { disabled: !searchParams.has('edit') })}
              onSelect={option => setValue('OS', option.value)}
            />
          }
        />
        <FormControl
          title='Impact on work'
          control={
            <StyledTextArea
              cols={90}
              rows={6}
              {...register('impactOnWork', { disabled: !searchParams.has('edit') })}
            />
          }
        />
      </FormSection>
      <Chat id={ticketId} />
      {!!defaultValues.screenshots?.length && (
        <FileUploader
          subtitle='Please upload file with the following format: png, jpg, jpeg, pdf'
          multiple
          accept='.png,.jpg,.jpeg,.pdf'
          disabled
          defaultFiles={defaultValues.screenshots.map(file => ({
            name: file.name,
            url: import.meta.env.VITE_URL + file.url
          }))}
        />
      )}
      <FormSection title='Expected support outcome'>
        <FormControl
          title='Expected resolution'
          control={
            <Select
              options={[
                { name: 'Immediate', value: 'Immediate' },
                { name: 'Soon', value: 'Soon' },
                { name: 'No Rush', value: 'No Rush' }
              ].map(option => ({ ...option, selected: option.value === defaultValues.expectedResolution }))}
              {...register('expectedResolution', { disabled: !searchParams.has('edit') })}
              onSelect={option => setValue('expectedResolution', option.value)}
            />
          }
        />
        <FormControl
          title='Preferred contact channel'
          control={
            <Select
              options={[
                { name: 'Email', value: 'Email' },
                { name: 'Phone', value: 'Phone' },
                { name: 'Chat', value: 'Chat' }
              ].map(option => ({ ...option, selected: option.value === defaultValues.preferredContact }))}
              {...register('preferredContact', { disabled: !searchParams.has('edit') })}
              onSelect={option => setValue('preferredContact', option.value)}
            />
          }
        />
      </FormSection>
      {role === 'support' && (
        <FormSection title='Support info'>
          <FormControl
            title='Responsible group'
            control={
              <Select
                options={groupsData.map(option => ({
                  name: option.name,
                  value: option.value,
                  selected: option.value == defaultValues.responsibleGroupId
                }))}
                {...register('responsibleGroupId', { disabled: !searchParams.has('edit') })}
                onSelect={option => setValue('responsibleGroupId', option.value)}
              />
            }
          />
          <FormControl
            title='Responsible user'
            control={
              <Select
                options={usersData.map(option => ({
                  name: option.name,
                  value: option.value,
                  selected: option.value == defaultValues.responsibleUserId
                }))}
                {...register('responsibleUserId', { disabled: !searchParams.has('edit') })}
                onSelect={option => setValue('responsibleUserId', option.value)}
              />
            }
          />
          <FormControl
            title='Service'
            control={
              <Select
                options={[
                  { name: 'Email', value: 'Email' },
                  { name: 'SIP phone', value: 'SIP phone' },
                  { name: 'Network hardware', value: 'Network hardware' },
                  { name: 'Servers', value: 'Servers' },
                  { name: 'Company Services', value: 'Company Services' },
                  { name: 'New user request', value: 'New user request' }
                ].map(option => ({ ...option, selected: option.value === defaultValues.service }))}
                {...register('service', { disabled: !searchParams.has('edit') })}
                onSelect={option => setValue('service', option.value)}
              />
            }
          />
          <FormControl
            title='Status'
            control={
              <Select
                options={[
                  { name: 'Created', value: 'CREATED' },
                  { name: 'Assigned', value: 'ASSIGNED' },
                  { name: 'In progress', value: 'IN_PROGRESS' },
                  { name: 'Closed', value: 'CLOSED' }
                ].map(option => ({ ...option, selected: option.value === defaultValues.status }))}
                {...register('status', { disabled: !searchParams.has('edit') })}
                onSelect={option => setValue('status', option.value)}
              />
            }
          />
        </FormSection>
      )}
      <Buttons>
        {searchParams.has('edit') && (
          <Button type='submit' $type='primary'>
            Apply
          </Button>
        )}
        {role === 'user' && defaultValues.status === 'CLOSED' && (
          <Button type='button' $type='black' onClick={() => trigger({ status: 'IN_PROGRESS' })}>
            Reopen
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
