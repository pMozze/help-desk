export interface TicketsItem {
  id: number;
  lastModifiedAt: number;
  type: string;
  title: string;
  status: string;
}

export interface Ticket {
  id: number;
  name: string;
  description: string;
  status: 'CREATED' | 'ASSIGNED' | 'IN_PROGRESS' | 'CLOSED';
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
  screenshots: [];
  expectedResolution: string;
  preferredContact: string;
  responsibleUserId: string;
  responsibleUserName: string;
  responsibleGroupId: string;
  service: string;
}

export interface WikiPage {
  name: string;
  description: string;
  url: string;
  createdAt: number;
  modifiedAt: number;
}
