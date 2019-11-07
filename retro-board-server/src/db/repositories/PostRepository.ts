import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Session, Post, ColumnDefinition, Vote } from '../entities';
import SessionRepository from './SessionRepository';
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
      const sessionRepository = getCustomRepository(SessionRepository);
      const newSession = {
        ...defaultSession,
        id: sessionId,
        posts: [{ ...post, session: { id: sessionId } }],
      };
      await sessionRepository.saveFromJson(newSession);
    }
  }
}

function toPost(json: JsonPost, session: Session): Post {
  const post = new Post(json.id, session, json.column, json.content, json.user);
  post.votes = json.votes.map(
    jsonVote => new Vote(jsonVote.id, post, jsonVote.user, jsonVote.type)
  );
  post.action = json.action;
  return post;
}

function toColumnDef(json: JsonColumn, session: Session): ColumnDefinition {
  return new ColumnDefinition(
    json.id,
    session,
    json.type,
    json.index,
    json.label,
    json.color,
    json.icon
  );
}
