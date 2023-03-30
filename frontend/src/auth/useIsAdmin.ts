import useBackendCapabilities from '../global/useBackendCapabilities';
import useUser from '../state/user/useUser';

export default function useIsAdmin() {
  const user = useUser();
  const backend = useBackendCapabilities();
  return user?.email === backend.adminEmail;
}
