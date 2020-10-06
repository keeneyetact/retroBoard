import { SessionMetadata } from 'retro-board-common';
import useUser from '../auth/useUser';
import { fetchPreviousSessions } from '../api';
import { useState, useEffect, useCallback } from 'react';

let CACHE: SessionMetadata[] = [];

export default (): [SessionMetadata[], Function] => {
  const [sessions, setSessions] = useState<SessionMetadata[]>(CACHE);
  const user = useUser();

  const refresh = useCallback(async () => {
    if (user && user.accountType !== 'anonymous') {
      const previousSessions = await fetchPreviousSessions();
      setSessions(previousSessions);
      CACHE = previousSessions;
    } else {
      setSessions([]);
      CACHE = [];
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [sessions, refresh];
};
