import { useMemo } from 'react';
import useGlobalState from '../../state';
import { numberOfVotes } from './permissions-logic';
import useUser from '../../auth/useUser';

interface RemainingVotes {
  up: number | null;
  down: number | null;
}

export default function useRemainingVotes(): RemainingVotes {
  const {
    state: { session },
  } = useGlobalState();
  const user = useUser();

  const result = useMemo(() => {
    if (!session || !user) {
      return { up: null, down: null };
    }
    const upVotes = numberOfVotes('like', user.id, session);
    const downVotes = numberOfVotes('dislike', user.id, session);

    return {
      up:
        session.maxUpVotes !== null
          ? Math.max(session.maxUpVotes - upVotes, 0)
          : null,
      down:
        session.maxDownVotes !== null
          ? Math.max(session.maxDownVotes - downVotes, 0)
          : null,
    };
  }, [session, user]);

  return result;
}
