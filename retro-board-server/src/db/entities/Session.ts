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
import { DEFAULT_TIMESTAMP } from '../utils';

@Entity({ name: 'sessions' })
export default class Session {
  @PrimaryColumn({ primary: true, generated: false, unique: true })
  public id: string;
  @Column({ nullable: true })
  @Index()
  public name: string;
  @OneToMany(() => Post, post => post.session, {
    eager: true,
    cascade: true,
  })
  public posts: Post[] | undefined;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date | undefined;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date | undefined;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
