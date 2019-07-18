import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Session from './Session';
import User from './User';
import { DEFAULT_TIMESTAMP } from '../utils';

@Entity({ name: 'posts' })
export default class Post {
  @PrimaryColumn({ primary: true, generated: false })
  public id: string;
  @ManyToOne(() => Session)
  public session: Session;
  @Column()
  public postType: string;
  @Column()
  public content: string;
  @Column({ nullable: true, type: 'character varying' })
  public action: null | string;
  @ManyToOne(() => User, { eager: true, cascade: true })
  public user: User;
  @ManyToMany(() => User, { eager: true, cascade: true })
  @JoinTable({ name: 'posts-likes' })
  public likes: User[] | undefined;
  @ManyToMany(() => User, { eager: true, cascade: true })
  @JoinTable({ name: 'posts-dislikes' })
  public dislikes: User[] | undefined;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date | undefined;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date | undefined;
  constructor(
    id: string,
    session: Session,
    postType: string,
    content: string,
    user: User
  ) {
    this.id = id;
    this.session = session;
    this.postType = postType;
    this.content = content;
    this.user = user;
    this.action = null;
  }
}
