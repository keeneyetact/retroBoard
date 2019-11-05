import { SessionOptions, Session } from './types';

export const defaultOptions: SessionOptions = {
  allowActions: true,
  allowMultipleVotes: false,
  allowSelfVoting: false,
  maxDownVotes: null,
  maxUpVotes: null,
};

export const defaultSession: Session = {
  ...defaultOptions,
  id: '',
  columns: [
    { id: '', index: 0, label: '', type: 'well', color: '', icon: null },
    { id: '', index: 1, label: '', type: 'notWell', color: '', icon: null },
    { id: '', index: 2, label: '', type: 'ideas', color: '', icon: null },
  ],
  name: null,
  posts: [],
};
