import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import Post from './Post';
import ColumnDefinition from './ColumnDefinition';
import { SessionOptions, defaultOptions } from 'retro-board-common';
import User from './User';

@Entity({ name: 'sessions' })
export default class Session {
  @PrimaryColumn({ primary: true, generated: false, unique: true })
  public id: string;
  @Column({ nullable: true, type: 'character varying' })
  @Index()
  public name: string | null;
  @ManyToOne(() => User, { eager: true, cascade: true, nullable: false })
  public createdBy: User;
  @OneToMany(
    () => Post,
    post => post.session,
    {
      cascade: true,
      nullable: false,
      eager: false,
    }
  )
  public posts: Post[] | undefined;
  @OneToMany(
    () => ColumnDefinition,
    colDef => colDef.session,
    {
      cascade: true,
      nullable: false,
      eager: false,
    }
  )
  public columns: ColumnDefinition[] | undefined;
  @Column({ nullable: true, type: 'numeric' })
  public maxUpVotes: number | null;
  @Column({ nullable: true, type: 'numeric' })
  public maxDownVotes: number | null;
  @Column({ default: true })
  public allowActions: boolean;
  @Column({ default: false })
  public allowSelfVoting: boolean;
  @Column({ default: false })
  public allowMultipleVotes: boolean;
  @Column({ default: false })
  public allowAuthorVisible: boolean;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date | undefined;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date | undefined;

  constructor(
    id: string,
    name: string | null,
    createdBy: User,
    options: Partial<SessionOptions>
  ) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    const optionsWithDefault = getDefaultOptions(options);
    this.maxUpVotes = optionsWithDefault.maxUpVotes;
    this.maxDownVotes = optionsWithDefault.maxDownVotes;
    this.allowAuthorVisible = optionsWithDefault.allowAuthorVisible;
    this.allowActions = optionsWithDefault.allowActions;
    this.allowSelfVoting = optionsWithDefault.allowSelfVoting;
    this.allowMultipleVotes = optionsWithDefault.allowMultipleVotes;
  }
}

function getDefaultOptions(options: Partial<SessionOptions>): SessionOptions {
  return {
    ...defaultOptions,
    ...options,
  };
}
