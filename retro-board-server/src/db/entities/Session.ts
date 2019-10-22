import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Post from './Post';
import { SessionOptions } from 'retro-board-common';

@Entity({ name: 'sessions' })
export default class Session {
  @PrimaryColumn({ primary: true, generated: false, unique: true })
  public id: string;
  @Column({ nullable: true, type: 'character varying' })
  @Index()
  public name: string | null;
  @OneToMany(() => Post, post => post.session, {
    cascade: true,
    nullable: false,
    eager: false,
  })
  public posts: Post[] | undefined;
  @Column({ nullable: true, type: 'numeric', default: null })
  public maxUpVotes: number | null;
  @Column({ nullable: true, type: 'numeric', default: null })
  public maxDownVotes: number | null;
  @Column({ nullable: true, type: 'character varying', default: null })
  public wellLabel: string | null;
  @Column({ nullable: true, type: 'character varying', default: null })
  public notWellLabel: string | null;
  @Column({ nullable: true, type: 'character varying', default: null })
  public ideasLabel: string | null;
  @Column({ default: true })
  public allowActions: boolean;
  @Column({ default: false })
  public allowSelfVoting: boolean;
  @Column({ default: false })
  public allowMultipleVotes: boolean;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date | undefined;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date | undefined;

  constructor(
    id: string,
    name: string | null,
    options: Partial<SessionOptions>
  ) {
    this.id = id;
    this.name = name;
    const optionsWithDefault = getDefaultOptions(options);
    this.maxUpVotes = optionsWithDefault.maxUpVotes;
    this.maxDownVotes = optionsWithDefault.maxDownVotes;
    this.allowActions = optionsWithDefault.allowActions;
    this.wellLabel = optionsWithDefault.wellLabel;
    this.notWellLabel = optionsWithDefault.notWellLabel;
    this.ideasLabel = optionsWithDefault.ideasLabel;
    this.allowSelfVoting = optionsWithDefault.allowSelfVoting;
    this.allowMultipleVotes = optionsWithDefault.allowMultipleVotes;
  }
}

function getDefaultOptions(options: Partial<SessionOptions>): SessionOptions {
  return {
    maxUpVotes: null,
    maxDownVotes: null,
    allowActions: true,
    allowSelfVoting: false,
    allowMultipleVotes: false,
    ideasLabel: null,
    notWellLabel: null,
    wellLabel: null,
    ...options,
  };
}
