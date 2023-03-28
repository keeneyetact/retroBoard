import styled from '@emotion/styled';
import { Psychology } from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { requestConfig } from 'api/fetch';
import useUser from 'auth/useUser';
import { CoachMessage, CoachRole } from 'common';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { Chat } from './Chat';

type AiCoachProps = {
  open: boolean;
  onClose: () => void;
};

export function AiCoach({ open, onClose }: AiCoachProps) {
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const [id] = useState(v4());
  const { t } = useTranslation();
  const user = useUser();
  const disabled = !user || user.accountType === 'anonymous';

  const handleMessage = useCallback(
    async (content: string) => {
      setThinking(true);
      const newMessages = [...messages, { role: 'user' as CoachRole, content }];
      setMessages(newMessages);
      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          body: JSON.stringify({ id, messages: newMessages }),
          ...requestConfig(),
        });
        if (response.ok) {
          const msgs = (await response.json()) as CoachMessage[];
          setThinking(false);
          setMessages(msgs);
        } else if (response.status === 402) {
          setThinking(false);
          setMessages([
            ...newMessages,
            {
              role: 'assistant' as CoachRole,
              content:
                user && user.pro
                  ? t('Ai.paidLimitWarning')
                  : t('Ai.freeLimitWarning'),
            },
          ]);
        } else {
          setThinking(false);
          setMessages([
            ...newMessages,
            {
              role: 'assistant' as CoachRole,
              content: t('Ai.genericError'),
            },
          ]);
        }
      } catch (ex) {
        setThinking(false);
        console.error(ex);
      }
    },
    [messages, id, t, user]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <HeaderContainer>
          <Psychology />
          {t('Ai.title')}&nbsp;(beta)
        </HeaderContainer>
      </DialogTitle>
      <DialogContent>
        {disabled ? (
          <Alert severity="error">{t('Ai.disabledAnonymous')}</Alert>
        ) : (
          <Alert>{t('Ai.info')}</Alert>
        )}
        <Chat
          disabled={disabled}
          messages={messages}
          onMessage={handleMessage}
          thinking={thinking}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('Ai.close')}</Button>
      </DialogActions>
    </Dialog>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
