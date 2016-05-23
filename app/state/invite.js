import { createAction } from 'redux-actions';

export const TOGGLE_INVITE_DIALOG = 'TOGGLE_INVITE_DIALOG';

export default function reducer(state = {
    inviteDialogOpen: false
}, action) {
    switch (action.type) {
    case TOGGLE_INVITE_DIALOG:
        return {
            ...state,
            inviteDialogOpen: !state.inviteDialogOpen
        };
    default:
        return state;
    }
}

export const toggleInviteDialog = createAction(TOGGLE_INVITE_DIALOG);
