export interface TicketsItem {
  id: number;
  lastModifiedAt: number;
  type: string;
  title: string | null;
  status: string;
}

export interface Ticket {
  id: number;
  name: string;
  description: string;
  status: string;
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
}
