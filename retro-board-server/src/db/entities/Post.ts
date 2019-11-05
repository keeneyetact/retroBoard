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

@Entity({ name: 'posts' })
export default class Post {
  @PrimaryColumn({ primary: true, generated: false })
  public id: string;
  @ManyToOne(() => Session, { nullable: false })
  public session: Session;
  @Column({ default: 0 })
  public column: number;
  @Column()
  public content: string;
  @Column({ nullable: true, type: 'character varying' })
  public action: null | string;
  @ManyToOne(() => User, { eager: true, cascade: true, nullable: false })
  public user: User;
  @ManyToMany(() => User, { eager: true, cascade: true, nullable: false })
  @JoinTable({ name: 'posts-likes' })
  public likes: User[] | undefined;
  @ManyToMany(() => User, { eager: true, cascade: true, nullable: false })
  @JoinTable({ name: 'posts-dislikes' })
  public dislikes: User[] | undefined;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date | undefined;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date | undefined;
  constructor(
    id: string,
    session: Session,
    column: number,
    content: string,
    user: User
  ) {
    this.id = id;
    this.session = session;
    this.column = column;
    this.content = content;
    this.user = user;
    this.action = null;
  }
}
