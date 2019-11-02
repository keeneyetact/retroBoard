export interface Session extends SessionOptions {
  id: string;
  name: string | null;
  posts: Post[];
  columns: ColumnDefinition[];
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
}

export interface Post {
  id: string;
  column: number;
  content: string;
  action: string | null;
  user: User;
  likes: User[];
  dislikes: User[];
}

export interface User {
  id: string;
  name: string;
}

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
