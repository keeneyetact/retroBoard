import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { LexoRank } from 'lexorank';
import SessionEntity from './Session';
import UserEntity from './User';
import VoteEntity from './Vote';
import PostGroupEntity from './PostGroup';
import { Post } from 'retro-board-common';

@Entity({ name: 'posts' })
export default class PostEntity {
  @PrimaryColumn({ primary: true, generated: false, unique: true })
  public id: string;
  @ManyToOne(() => SessionEntity, { nullable: false })
  public session: SessionEntity;
  @ManyToOne(() => PostGroupEntity, {
    nullable: true,
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  public group: PostGroupEntity | null;
  @Column({ default: 0 })
  public column: number;
  @Index()
  @Column({ default: LexoRank.middle().toString() })
  public rank: string;
  @Column()
  public content: string;
  @Column({ nullable: true, type: 'character varying' })
  public action: null | string;
  @Column({ nullable: true, type: 'character varying' })
  public giphy: null | string;
  @ManyToOne(() => UserEntity, { eager: true, cascade: true, nullable: false })
  public user: UserEntity;
  @OneToMany(() => VoteEntity, (vote) => vote.post, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  public votes: VoteEntity[] | undefined;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date | undefined;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date | undefined;

  toJson(): Post {
    return {
      id: this.id,
      action: this.action,
      column: this.column,
      content: this.content,
      giphy: this.giphy,
      group: this.group ? this.group.toJson() : null,
      rank: this.rank,
      user: this.user.toJson(),
      votes: this.votes === undefined ? [] : this.votes.map((v) => v.toJson()),
    };
  }

  constructor(
    id: string,
    session: SessionEntity,
    column: number,
    content: string,
    user: UserEntity
  ) {
    this.id = id;
    this.session = session;
    this.column = column;
    this.content = content;
    this.user = user;
    this.action = null;
    this.giphy = null;
    this.group = null;
    this.rank = LexoRank.middle().toString();
  }
}
