export interface Session extends SessionOptions {
  id: string;
  name: string | null;
  posts: Post[];
}

export interface SessionOptions {
  maxUpVotes: number | null;
  maxDownVotes: number | null;
  allowActions: boolean;
  allowSelfVoting: boolean;
  allowMultipleVotes: boolean;
  wellLabel: string | null;
  notWellLabel: string | null;
  ideasLabel: string | null;
}

export interface Post {
  id: string;
  postType: PostType;
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

export enum PostType {
  Well = 'well',
  NotWell = 'notWell',
  Ideas = 'ideas',
}
