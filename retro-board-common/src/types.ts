export interface Session {
  id: string;
  name: string | null;
  posts: Post[];
  groups: PostGroup[];
  columns: ColumnDefinition[];
  options: SessionOptions;
  createdBy: User;
}

export interface SessionMetadata {
  id: string;
  name: string | null;
  participants: User[];
  numberOfPosts: number;
  numberOfPositiveVotes: number;
  numberOfNegativeVotes: number;
  numberOfActions: number;
  created: Date;
  createdBy: User;
}

export interface SessionTemplate {
  id: string;
  name: string;
  columns: ColumnDefinition[];
  options: SessionOptions;
  createdBy: User;
}

export interface ColumnDefinition {
  id: string;
  type: ColumnDefinitionType;
  index: number;
  label: string;
  color: string;
  icon: IconName | null;
}

export interface SessionOptions {
  maxUpVotes: number | null;
  maxDownVotes: number | null;
  allowActions: boolean;
  allowSelfVoting: boolean;
  allowMultipleVotes: boolean;
  allowAuthorVisible: boolean;
}

export interface Rankable {
  rank: string;
}

export interface Post extends Rankable {
  id: string;
  column: number;
  content: string;
  action: string | null;
  giphy: string | null;
  user: User;
  group: PostGroup | null;
  votes: Vote[];
}

export interface PostGroup extends Rankable {
  id: string;
  label: string;
  column: number;
  user: User;
  posts: Post[];
}

export interface User {
  id: string;
  name: string;
  accountType: AccountType;
  username: string | null;
  photo: string | null;
  language: string;
}

export type AccountType = 'anonymous' | 'google' | 'twitter' | 'github';

export interface Vote {
  id: string;
  user: User;
  type: VoteType;
}

export type VoteType = 'like' | 'dislike';

export type TrackingEvent =
  | 'custom-modal/open'
  | 'custom-modal/close'
  | 'custom-modal/create'
  | 'custom-modal/fail'
  | 'custom-modal/template/select'
  | 'custom-modal/column/change'
  | 'home/create/default'
  | 'game/session/reset'
  | 'game/session/disconnect'
  | 'language/change/';

export type ColumnDefinitionType =
  | 'custom'
  | 'well'
  | 'notWell'
  | 'ideas'
  | 'start'
  | 'stop'
  | 'continue'
  | 'liked'
  | 'learned'
  | 'lacked'
  | 'longedFor'
  | 'anchor'
  | 'cargo'
  | 'island'
  | 'wind'
  | 'rock';

export type IconName =
  | 'satisfied'
  | 'disatisfied'
  | 'sunny'
  | 'announcement'
  | 'file'
  | 'money'
  | 'renew'
  | 'play'
  | 'pause'
  | 'fast-forward'
  | 'liked'
  | 'books'
  | 'help'
  | 'cocktail'
  | 'link'
  | 'boat'
  | 'fitness'
  | 'gesture';
