import { SessionMetadata } from 'retro-board-common';
import useUser from '../auth/useUser';
import { fetchPreviousSessions } from '../api';
import { useState, useEffect } from 'react';

export default (): SessionMetadata[] => {
  const [sessions, setSessions] = useState<SessionMetadata[]>([]);
  const user = useUser();

  useEffect(() => {
    async function load() {
      if (user && user.accountType !== 'anonymous') {
        console.log('Loading sessions');
        const previousSessions = await fetchPreviousSessions();
        setSessions(previousSessions);
      }
    }
    load();
  }, [user]);

  return sessions;
};
