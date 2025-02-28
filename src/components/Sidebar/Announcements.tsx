import { FC } from 'react';
import styled from 'styled-components';
import Pagination from '../ui/Pagination';

const Wrapper = styled.div`
  padding-bottom: 15px;
  background-color: #fff;
  border-radius: 0 0 20px 20px;
`;

const Announcement = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #868686;
`;

const AnnouncementDate = styled.div`
  padding: 5px 10px;
  width: fit-content;

  font-size: 14px;
  font-weight: 500;

  border-radius: 4px;
  background-color: #e9e9e9;
`;

const AnnouncementTitle = styled.div`
  margin-top: 10px;
  font-weight: 500;
`;

const AnnouncementDescription = styled.div`
  font-size: 14px;
  color: #717a81;
`;

const StyledPagination = styled(Pagination)`
  padding: 15px 25px;
  width: 100%;
`;

const Announcements: FC = () => {
  return (
    <Wrapper>
      <Announcement>
        <AnnouncementDate>19 Dec 2020</AnnouncementDate>
        <AnnouncementTitle>Regular Note T-322</AnnouncementTitle>
        <AnnouncementDescription>Announcement Description</AnnouncementDescription>
      </Announcement>
      <Announcement>
        <AnnouncementDate>19 Dec 2020</AnnouncementDate>
        <AnnouncementTitle>Regular Note T-322</AnnouncementTitle>
        <AnnouncementDescription>Announcement Description</AnnouncementDescription>
      </Announcement>
      <Announcement>
        <AnnouncementDate>19 Dec 2020</AnnouncementDate>
        <AnnouncementTitle>Regular Note T-322</AnnouncementTitle>
        <AnnouncementDescription>Announcement Description</AnnouncementDescription>
      </Announcement>
      <Announcement>
        <AnnouncementDate>19 Dec 2020</AnnouncementDate>
        <AnnouncementTitle>Regular Note T-322</AnnouncementTitle>
        <AnnouncementDescription>Announcement Description</AnnouncementDescription>
      </Announcement>
      <Announcement>
        <AnnouncementDate>19 Dec 2020</AnnouncementDate>
        <AnnouncementTitle>Regular Note T-322</AnnouncementTitle>
        <AnnouncementDescription>Announcement Description</AnnouncementDescription>
      </Announcement>
      <Announcement>
        <AnnouncementDate>19 Dec 2020</AnnouncementDate>
        <AnnouncementTitle>Regular Note T-322</AnnouncementTitle>
        <AnnouncementDescription>Announcement Description</AnnouncementDescription>
      </Announcement>
      <Announcement>
        <AnnouncementDate>19 Dec 2020</AnnouncementDate>
        <AnnouncementTitle>Regular Note T-322</AnnouncementTitle>
        <AnnouncementDescription>Announcement Description</AnnouncementDescription>
      </Announcement>
      <StyledPagination />
    </Wrapper>
  );
};

export default Announcements;
