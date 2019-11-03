import React, {
  useContext,
  useReducer,
  createContext,
  useMemo,
  SFC,
} from 'react';
import { State, Action } from './types';
import reducer from './reducer';
import {
  togglePanel,
  login,
  logout,
  setPlayers,
  receivePost,
  deletePost,
  updatePost,
  receiveBoard,
  toggleSummaryMode,
  renameSession,
  resetSession,
} from './actions';

export const initialState: State = {
  panelOpen: false,
  username: null,
  players: [],
  summaryMode: false,
  session: {
    id: '',
    name: '',
    posts: [],
    allowActions: true,
    allowMultipleVotes: false,
    allowSelfVoting: false,
    maxDownVotes: null,
    maxUpVotes: null,
    wellLabel: null,
    ideasLabel: null,
    notWellLabel: null,
  },
};

const Context = createContext({
  state: initialState,
  dispatch: (_: Action) => {},
});

interface ProviderProps {
  initialState?: State;
}

export const Provider: SFC<ProviderProps> = props => {
  const [state, dispatch] = useReducer(
    reducer,
    props.initialState ? props.initialState : initialState
  );
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export function useGlobalState() {
  const { state, dispatch } = useContext(Context);
  const actions = useMemo(() => {
    return {
      togglePanel: togglePanel(dispatch),
      login: login(dispatch),
      logout: logout(dispatch),
      setPlayers: setPlayers(dispatch),
      receivePost: receivePost(dispatch),
      deletePost: deletePost(dispatch),
      updatePost: updatePost(dispatch),
      receiveBoard: receiveBoard(dispatch),
      toggleSummaryMode: toggleSummaryMode(dispatch),
      renameSession: renameSession(dispatch),
      resetSession: resetSession(dispatch),
    };
  }, [dispatch]);
  const globalState = useMemo(() => {
    return {
      state,
      ...actions,
    };
  }, [state, actions]);

  return globalState;
}
