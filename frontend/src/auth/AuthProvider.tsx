import { useEffect, PropsWithChildren } from 'react';
import { setScope } from '../track';
import useUser from 'state/user/useUser';

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const user = useUser();
  useEffect(() => {
    setScope((scope) => {
      if (scope && user) {
        scope.setUser({
          id: user.id,
          email: user.email || undefined,
          username: user.username || undefined,
        });
      }
    });
  }, [user]);

  return <>{children}</>;
}
