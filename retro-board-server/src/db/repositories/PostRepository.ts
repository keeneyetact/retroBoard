import { EntityRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Session, Post, ColumnDefinition } from '../entities';
import {
  Post as JsonPost,
  ColumnDefinition as JsonColumn,
  defaultSession,
} from 'retro-board-common';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
  async saveFromJson(sessionId: string, post: JsonPost): Promise<void> {
    const session = await this.manager.findOne(Session, sessionId);
    if (session) {
      await this.save(toPost(post, session));
    } else {
      const newSession = new Session(sessionId, null, {});
      newSession.posts = [toPost(post, newSession)];
      newSession.columns = defaultSession.columns.map(col =>
        toColumnDef(col, newSession)
      );
      await this.manager.save(Session, newSession);
    }
  }
}

function toPost(json: JsonPost, session: Session): Post {
  const post = new Post(json.id, session, json.column, json.content, json.user);
  post.likes = json.likes.map(u => ({ id: u.id, name: u.name }));
  post.dislikes = json.dislikes.map(u => ({ id: u.id, name: u.name }));
  post.action = json.action;
  return post;
}

function toColumnDef(json: JsonColumn, session: Session): ColumnDefinition {
  return {
    ...json,
    id: v4(),
    session,
  };
}
