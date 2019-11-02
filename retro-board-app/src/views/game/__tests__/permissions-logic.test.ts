import { permissionLogic } from '../permissions-logic';
import { Post, Session, User, SessionOptions } from 'retro-board-common';

const currentUser: User = {
  id: '1',
  name: 'Current',
};

const anotherUser: User = {
  id: '2',
  name: 'Another User',
};

const post = (user: User, likes?: User[], dislikes?: User[]): Post => ({
  user,
  column: 0,
  content: 'Some content',
  id: 'acme',
  action: '',
  likes: likes || [],
  dislikes: dislikes || [],
});

const session = (options: SessionOptions, ...posts: Post[]): Session => ({
  ...options,
  id: 'acme',
  name: 'Session title',
  posts,
  columns: [],
});

const defaultOptions: SessionOptions = {
  allowActions: true,
  allowMultipleVotes: false,
  allowSelfVoting: false,
  maxDownVotes: null,
  maxUpVotes: null,
};

describe('Permission Logic', () => {
  it('When using default rules, a user on its own post', () => {
    const p = post(currentUser);
    const s = session(defaultOptions, p);
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(true);
    expect(result.canDelete).toBe(true);
    expect(result.canDownVote).toBe(false);
    expect(result.canUpVote).toBe(false);
  });

  it('When using default rules, a user on another users post', () => {
    const p = post(anotherUser);
    const s = session(defaultOptions, p);
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(true);
  });

  it('When using default rules, a user on another users post but already voted', () => {
    const p = post(anotherUser, [currentUser]);
    const s = session(defaultOptions, p);
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(false);
    expect(result.canUpVote).toBe(false);
  });

  it('When limiting to 2 up votes, but already voted once', () => {
    const p1 = post(anotherUser, [currentUser]);
    const p2 = post(anotherUser, []);
    const s = session(
      {
        ...defaultOptions,
        maxUpVotes: 2,
      },
      p1,
      p2
    );
    const result = permissionLogic(p2, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(true);
  });

  it('When limiting to 2 up votes, but already voted twice', () => {
    const p1 = post(anotherUser, [currentUser]);
    const p2 = post(anotherUser, [currentUser]);
    const p3 = post(anotherUser, []);
    const s = session(
      {
        ...defaultOptions,
        maxUpVotes: 2,
      },
      p1,
      p2,
      p3
    );
    const result = permissionLogic(p3, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(false);
  });

  it('When preventing actions', () => {
    const p = post(anotherUser);
    const s = session(
      {
        ...defaultOptions,
        allowActions: false,
      },
      p
    );
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(false);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(true);
  });

  it('When preventing actions', () => {
    const p = post(anotherUser);
    const s = session(
      {
        ...defaultOptions,
        allowActions: false,
      },
      p
    );
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(false);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(true);
  });

  it('When allowing self-voting', () => {
    const p = post(currentUser);
    const s = session(
      {
        ...defaultOptions,
        allowSelfVoting: true,
      },
      p
    );
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(true);
    expect(result.canDelete).toBe(true);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(true);
  });

  it('When allowing multi-votes (unlimited votes)', () => {
    const p = post(anotherUser, [currentUser]);
    const s = session(
      {
        ...defaultOptions,
        allowMultipleVotes: true,
      },
      p
    );
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(true);
  });

  it('When allowing multi-votes (limited votes but not reached limit)', () => {
    const p = post(anotherUser, [currentUser, currentUser]);
    const s = session(
      {
        ...defaultOptions,
        allowMultipleVotes: true,
        maxUpVotes: 3,
      },
      p
    );
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(true);
  });

  it('When allowing multi-votes (limited votes but reached limit)', () => {
    const p = post(anotherUser, [currentUser, currentUser, currentUser]);
    const s = session(
      {
        ...defaultOptions,
        allowMultipleVotes: true,
        maxUpVotes: 3,
      },
      p
    );
    const result = permissionLogic(p, s, currentUser);
    expect(result.canCreateAction).toBe(true);
    expect(result.canEdit).toBe(false);
    expect(result.canDelete).toBe(false);
    expect(result.canDownVote).toBe(true);
    expect(result.canUpVote).toBe(false);
  });
});
