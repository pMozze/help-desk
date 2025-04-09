import { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  id: number | string;
  className?: string;
}

const StyledIframe = styled.iframe`
  border: none;
`;

const Chat: FC<Props> = ({ id, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current!;

    const onLoadHandler = () => {
      if (iframe.contentDocument?.body) {
        iframe.height = `${iframe.contentDocument.body.scrollHeight}px`;
      }
    };

    iframe.addEventListener('load', onLoadHandler);
    return () => iframe.removeEventListener('load', onLoadHandler);
  }, []);

  return (
    <StyledIframe
      ref={iframeRef}
      className={className}
      src={`${import.meta.env.VITE_URL}/helpdesk/iframe.php?IFRAME=Y&ID=${id}`}
    />
  );
};

export default Chat;
