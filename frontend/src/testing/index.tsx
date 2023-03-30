import { PropsWithChildren, useEffect } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { FullUser, Session, defaultOptions } from 'common';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import useSession from '../views/game/useSession';
import { RecoilRoot } from 'recoil';
import { userState } from 'state/user/user-state';

const user: FullUser = {
  id: 'John Doe',
  name: 'John Doe',
  photo: null,
  accountType: 'anonymous',
  language: 'en-GB',
  username: 'johndoe',
  email: 'john@doe.com',
  pro: false,
  stripeId: null,
  subscriptionsId: null,
  currency: null,
  plan: null,
  planOwner: null,
  planOwnerEmail: null,
  planAdmins: null,
  domain: null,
  ownPlan: null,
  ownSubscriptionsId: null,
  trial: null,
  canDeleteSession: false,
  identityId: 'John Doe Identity',
};

export const initialSession: Session = {
  id: 'test-session',
  name: 'My Retro',
  posts: [],
  groups: [],
  columns: [],
  messages: [],
  encrypted: null,
  locked: false,
  createdBy: {
    id: 'John Doe',
    name: 'John Doe',
    photo: null,
  },
  options: {
    ...defaultOptions,
  },
  ready: [],
  timer: null,
  demo: false,
};

export function AllTheProviders({ children }: PropsWithChildren<{}>) {
  return (
    <RecoilRoot initializeState={(snap) => snap.set(userState, user)}>
      <Inner>{children}</Inner>
    </RecoilRoot>
  );
}

export default function Inner({ children }: PropsWithChildren<{}>) {
  const { receiveBoard } = useSession();

  useEffect(() => {
    receiveBoard(initialSession);
  }, [receiveBoard]);
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="test">
        {(dropProvided: DroppableProvided, _: DroppableStateSnapshot) => (
          <div ref={dropProvided.innerRef}>{children}</div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const customRender = (
  ui: React.ReactElement<any>,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
