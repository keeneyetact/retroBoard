import { autoLoginUser } from './user';
import { autoJoinUser } from './session';

export function* initialiseApp(action) {
    yield autoLoginUser();
    yield autoJoinUser(action.payload);
}
