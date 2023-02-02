const actions = {
  ACK: 'retrospected/ack',
  ADD_POST_SUCCESS: 'retrospected/posts/add/success',
  DELETE_POST: 'retrospected/posts/delete',
  EDIT_POST: 'retrospected/posts/edit',
  MOVE_POST: 'retrospected/posts/move',
  LIKE_SUCCESS: 'retrospected/posts/like/success',
  CANCEL_VOTES_SUCCESS: 'retrospected/posts/cancel-votes/success',
  ADD_POST_GROUP_SUCCESS: 'retrospected/group/add/success',
  DELETE_POST_GROUP: 'retrospected/group/delete',
  EDIT_POST_GROUP: 'retrospected/group/edit',
  RENAME_SESSION: 'retrospected/session/rename',
  JOIN_SESSION: 'retrospected/session/join',
  LEAVE_SESSION: 'retrospected/session/leave',
  EDIT_OPTIONS: 'retrospected/session/options/edit',
  EDIT_COLUMNS: 'retrospected/session/columns/edit',
  SAVE_TEMPLATE: 'retrospected/session/template/save',
  LOCK_SESSION: 'retrospected/session/lock',
  REQUEST_BOARD: 'retrospected/session/request',
  USER_READY: 'retrospected/user-ready',
  CHAT_MESSAGE: 'retrospected/session/chat',
  START_TIMER: 'retrospected/timer/start',
  STOP_TIMER: 'retrospected/timer/stop',

  RECEIVE_POST: 'retrospected/posts/receive/add',
  RECEIVE_DELETE_POST: 'retrospected/posts/receive/delete',
  RECEIVE_EDIT_POST: 'retrospected/posts/receive/edit',
  RECEIVE_MOVE_POST: 'retrospected/posts/receive/move',
  RECEIVE_LIKE: 'retrospected/posts/receive/like',
  RECEIVE_CANCEL_VOTES: 'retrospected/posts/receive/cancel-votes',
  RECEIVE_POST_GROUP: 'retrospected/group/receive/add',
  RECEIVE_DELETE_POST_GROUP: 'retrospected/group/receive/delete',
  RECEIVE_EDIT_POST_GROUP: 'retrospected/group/receive/edit',
  RECEIVE_BOARD: 'retrospected/posts/receive-all',
  RECEIVE_OPTIONS: 'retrospected/session/options/receive',
  RECEIVE_COLUMNS: 'retrospected/session/columns/receive',
  RECEIVE_CLIENT_LIST: 'retrospected/session/receive/client-list',
  RECEIVE_SESSION_NAME: 'retrospected/session/receive/rename',
  RECEIVE_LOCK_SESSION: 'retrospected/session/receive/lock',
  RECEIVE_UNAUTHORIZED: 'retrospected/session/receive/unauthorized',
  RECEIVE_RATE_LIMITED: 'retrospected/rate-limited-error',
  RECEIVE_ERROR: 'retrospected/receive/error',
  RECEIVE_USER_READY: 'retrospected/receive/user-ready',
  RECEIVE_CHAT_MESSAGE: 'retrospected/session/chat/receive',
  RECEIVE_TIMER_START: 'retrospected/timer/start/receive',
  RECEIVE_TIMER_STOP: 'retrospected/timer/stop/receive',
};

export default actions;
