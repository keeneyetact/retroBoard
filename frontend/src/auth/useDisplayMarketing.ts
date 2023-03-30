import { useLocation } from 'react-router-dom';
import useUser from '../state/user/useUser';

export default function useDisplayMarketing(): boolean {
  const location = useLocation();
  const user = useUser();
  return !user && location.pathname === '/';
}
