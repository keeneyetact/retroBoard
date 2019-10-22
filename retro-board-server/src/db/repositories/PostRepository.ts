import { EntityRepository, Repository } from 'typeorm';
import { Session, Post } from '../entities';
import { Post as JsonPost } from 'retro-board-common/src/types';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
  async saveFromJson(sessionId: string, post: JsonPost): Promise<void> {
    const session = await this.manager.findOne(Session, sessionId);
    if (session) {
      await this.save(toPost(post, session));
    } else {
      const newSession = new Session(sessionId, null, {});
      newSession.posts = [toPost(post, newSession)];
      await this.manager.save(Session, newSession);
    }
  }
}

function toPost(json: JsonPost, session: Session): Post {
  const post = new Post(
    json.id,
    session,
    json.postType,
    json.content,
    json.user
  );
  post.likes = json.likes.map(u => ({ id: u.id, name: u.name }));
  post.dislikes = json.dislikes.map(u => ({ id: u.id, name: u.name }));
  post.action = json.action;
  return post;
}
