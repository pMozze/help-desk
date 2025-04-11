import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { format as formatDate, getUnixTime } from 'date-fns';

import useSWRMutation from 'swr/mutation';
import styled from 'styled-components';

import { Calendar } from 'vanilla-calendar-pro';
import { getDate } from 'vanilla-calendar-pro/utils';

import { apiFetcher } from '@/api/utils';

import FormSection from './FormSection';
import FormControl from './FormControl';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import FileUploader from '@/components/ui/FileUploader';
import Button from '@/components/ui/Button';

import CalendarIcon from '@icons/calendar.svg?react';

interface FormData {
  createdById: string;
  type: string;
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
  description: string;
  expectedResolution: string;
  preferredContact: string;
  screenshots: FileList;
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
  const { trigger } = useSWRMutation('/ticket/', (endpoint, options: { arg: globalThis.FormData }) =>
    apiFetcher<globalThis.FormData>(endpoint, 'PUT', options.arg)
  );

  const { register, handleSubmit, setValue } = useForm<FormData>();
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

  const submitHandler: SubmitHandler<FormData> = data => {
    const formData = new FormData();
    formData.append('createdById', document.getElementById('help-desk')!.dataset.userId ?? '0');
    formData.append('type', 'Customers complaints');
    formData.append('OS', data.OS);
    formData.append('browser', data.browser);
    formData.append('companyId', data.companyId);
    formData.append('contactInfo', data.contactInfo);
    formData.append('device', data.device);
    formData.append('eventDate', data.eventDate.toString());
    formData.append('expectedResolution', data.expectedResolution);
    formData.append('impactOnWork', data.impactOnWork);
    formData.append('description', data.description);
    formData.append('networkInfo', data.networkInfo);
    formData.append('preferredContact', data.preferredContact);
    formData.append('requestPriority', data.requestPriority);
    formData.append('requestTopic', data.requestTopic);
    formData.append('userId', data.userId);
    formData.append('username', data.username);

    for (const file of data.screenshots) {
      formData.append('screenshots[]', file);
    }

    trigger(formData);
    navigate('/');
  };

  return (
    <Wrapper onSubmit={handleSubmit(submitHandler)}>
      <FormSection title='Applicant information'>
        <FormControl title='User name' control={<Input type='text' {...register('username', { required: false })} />} />
        <FormControl
          title='Contact information, position or department'
          control={<Input type='text' {...register('contactInfo', { required: false })} />}
        />
      </FormSection>
      <FormSection title='Event data'>
        <FormControl
          title='Event date'
          control={<Input ref={eventDateInputRef} type='text' icon={CalendarIcon} required />}
        />
        <FormControl
          title='User identification (ID or Email)'
          control={<Input type='text' {...register('userId', { required: false })} />}
        />
        <FormControl
          title='Company identification (ID or name)'
          control={<Input type='text' {...register('companyId', { required: false })} />}
        />
      </FormSection>
      <FormSection title='Issue description'>
        <FormControl
          title='Request topic'
          control={
            <Select
              options={[
                { name: 'Group', value: 'Group', selected: true },
                { name: 'Subgroup', value: 'Subgroup' }
              ]}
              {...register('requestTopic', { required: false })}
              onSelect={option => setValue('requestTopic', option.value)}
            />
          }
        />
        <FormControl
          title='Description'
          control={<StyledTextArea cols={100} rows={4} {...register('description', { required: true })} />}
        />
        <FormControl title='Device' control={<Input type='text' {...register('device', { required: false })} />} />
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
              {...register('browser', { required: false })}
              onSelect={option => setValue('browser', option.value)}
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
                { name: 'High', value: 'High' }
              ]}
              {...register('requestPriority', { required: false })}
              onSelect={option => setValue('requestPriority', option.value)}
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
              {...register('networkInfo', { required: false })}
              onSelect={option => setValue('networkInfo', option.value)}
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
                { name: 'Android', value: 'Android' },
                { name: 'iOS', value: 'iOS' },
                { name: 'Other', value: 'Other' }
              ]}
              {...register('OS', { required: false })}
              onSelect={option => setValue('OS', option.value)}
            />
          }
        />
        <FormControl
          title='Impact on work'
          control={<StyledTextArea cols={100} rows={6} {...register('impactOnWork', { required: false })} />}
        />
      </FormSection>
      <FileUploader
        subtitle='Please upload file with the following format: png, jpg, jpeg, pdf'
        multiple
        accept='.png,.jpg,.jpeg,.pdf'
        {...register('screenshots', { required: false })}
      />
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
              {...register('expectedResolution', { required: false })}
              onSelect={option => setValue('expectedResolution', option.value)}
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
              {...register('preferredContact', { required: false })}
              onSelect={option => setValue('preferredContact', option.value)}
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

export default CreateForm;
