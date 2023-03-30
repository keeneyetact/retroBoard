import ScrollToBottom from 'react-scroll-to-bottom';
import styled from '@emotion/styled';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

import { keyframes } from '@emotion/react';
import { CoachMessage } from 'common';
import { Examples } from './Examples';
import { Alert, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type ChatProps = {
  messages: CoachMessage[];
  thinking: boolean;
  disabled: boolean;
  onMessage: (content: string) => void;
  onClose: () => void;
};

export function Chat({
  messages,
  disabled,
  thinking,
  onClose,
  onMessage,
}: ChatProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Container>
      <Main>
        <ScrollContainer>
          {messages.map((m, index) => (
            <ChatMessage
              message={m.content}
              own={m.role === 'user'}
              key={index}
            />
          ))}
          {thinking ? <ChatMessage message={<Ellipsis />} /> : null}
          {disabled ? (
            <AlertContainer>
              <Alert severity="error">{t('Ai.disabledAnonymous')}</Alert>
              <Button
                onClick={() => {
                  navigate('/account');
                  onClose();
                }}
              >
                {t('AccountPage.convertTitle')}
              </Button>
            </AlertContainer>
          ) : null}
          {!disabled && messages.length === 0 ? (
            <ExamplesContainer>
              <Examples onSelect={onMessage} />
            </ExamplesContainer>
          ) : null}
        </ScrollContainer>
      </Main>
      <UserInput>
        <ChatInput disabled={disabled} onMessage={onMessage} />
      </UserInput>
    </Container>
  );
}

const ellipsis = keyframes`
  0%    { content: ''; }
  25%   { content: '.'; }
  50%   { content: '..'; }
  75%   { content: '...'; }
  100%  { content: ''; }
`;

const Container = styled.div``;

const Main = styled.div`
  display: flex;
`;

const ExamplesContainer = styled.div`
  padding-top: 3rem;
`;

const UserInput = styled.div`
  margin-top: 20px;
`;

const ScrollContainer = styled(ScrollToBottom)`
  height: calc(100vh - 380px);
  flex: 1 1 auto;
`;

const Ellipsis = styled.div`
  min-width: 50px;
  font-size: 2.5rem;
  height: 10px;
  position: relative;
  top: -25px;
  ::after {
    display: inline-block;
    animation: ${ellipsis} steps(1, end) 1s infinite;
    content: '';
  }
`;

const AlertContainer = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
