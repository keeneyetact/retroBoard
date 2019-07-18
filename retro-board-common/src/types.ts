export interface Session {
  id: string;
  name: string;
  posts: Post[];
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
