import styled from '@emotion/styled';
import { colors } from '@mui/material';

type ChatMessageProps = {
  message: React.ReactNode;
  own?: boolean;
};

export default function ChatMessage({
  message,
  own = false,
}: ChatMessageProps) {
  return (
    <MessageContainer own={own}>
      <MessageContent own={own}>{message}</MessageContent>
    </MessageContainer>
  );
}

const MessageContainer = styled.div<{ own: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.own ? 'flex-end' : 'flex-start')};
  padding-right: ${(props) => (props.own ? '0' : '50px')};
  padding-left: ${(props) => (props.own ? '50px' : '0')};
  margin-top: 20px;
`;

const MessageContent = styled.div<{ own: boolean }>`
  white-space: pre-wrap;
  text-align: ${(props) => (props.own ? 'right' : 'left')};
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => (props.own ? colors.blue[400] : '#f0f0f0')};
  color: ${(props) => (props.own ? 'white' : 'black')};
`;
