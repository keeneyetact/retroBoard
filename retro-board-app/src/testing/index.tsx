import React, { useEffect, useState } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider, initialState } from '../state/context';
import { User } from 'retro-board-common';
import UserContext from '../auth/Context';
import { State } from '../state/types';

const testingInitialState: State = {
  ...initialState,
  session: {
    id: 'test-session',
    allowActions: true,
    allowAuthorVisible: false,
    allowMultipleVotes: false,
    allowSelfVoting: false,
    columns: [],
    createdBy: {
      id: 'John Doe',
      name: 'John Doe',
      accountType: 'anonymous',
      photo: null,
      username: 'johndoe',
      language: 'en',
    },
    maxDownVotes: null,
    maxUpVotes: null,
    name: 'My Retro',
    posts: [],
  },
};

const AllTheProviders: React.SFC = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'John Doe',
    name: 'John Doe',
    accountType: 'anonymous',
    photo: null,
    username: 'johndoe',
    language: 'en',
  });
  useEffect(() => {
    setUser({
      id: 'John Doe',
      name: 'John Doe',
      accountType: 'anonymous',
      photo: null,
      username: 'johndoe',
      language: 'en',
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, initialised: true }}>
      <Provider initialState={testingInitialState}>{children}</Provider>
    </UserContext.Provider>
  );
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const customRender = (
  ui: React.ReactElement<any>,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
