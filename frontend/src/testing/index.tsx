import { useEffect, useState } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { FullUser, Session, defaultOptions } from '@retrospected/common';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import UserContext from '../auth/Context';
import useSession from '../views/game/useSession';
import { RecoilRoot } from 'recoil';

export const initialSession: Session = {
  id: 'test-session',
  name: 'My Retro',
  posts: [],
  groups: [],
  columns: [],
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
};

export const AllTheProviders: React.FC = ({ children }) => {
  return (
    <RecoilRoot>
      <Inner>{children}</Inner>
    </RecoilRoot>
  );
};

const Inner: React.FC = ({ children }) => {
  const { receiveBoard } = useSession();
  const [user, setUser] = useState<FullUser | null>({
    id: 'John Doe',
    name: 'John Doe',
    photo: null,
    accountType: 'anonymous',
    language: 'en',
    username: 'johndoe',
    email: 'john@doe.com',
    pro: false,
    stripeId: null,
    subscriptionsId: null,
    currency: null,
    plan: null,
    domain: null,
    ownPlan: null,
    ownSubscriptionsId: null,
    trial: null,
  });
  useEffect(() => {
    receiveBoard(initialSession);
    setUser({
      id: 'John Doe',
      name: 'John Doe',
      photo: null,
      accountType: 'anonymous',
      language: 'en',
      username: 'johndoe',
      email: 'john@doe.com',
      pro: false,
      stripeId: null,
      subscriptionsId: null,
      currency: null,
      plan: null,
      domain: null,
      ownPlan: null,
      ownSubscriptionsId: null,
      trial: null,
    });
  }, [receiveBoard]);
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="test">
        {(dropProvided: DroppableProvided, _: DroppableStateSnapshot) => (
          <div ref={dropProvided.innerRef}>
            <UserContext.Provider value={{ user, setUser, initialised: true }}>
              {children}
            </UserContext.Provider>
          </div>
        )}
      </Droppable>
    </DragDropContext>
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
