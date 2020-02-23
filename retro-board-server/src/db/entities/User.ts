import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountType } from 'retro-board-common';

@Entity({ name: 'users' })
@Index(['username', 'accountType'], { unique: true })
export default class User {
  @PrimaryColumn({ primary: true, generated: false, unique: true })
  public id: string;
  @Column()
  @Index()
  public name: string;
  @Column({ default: 'anonymous' })
  public accountType: AccountType;
  @Column({ nullable: true, type: 'character varying' })
  public username: string | null;
  @Column({ nullable: true, type: 'character varying' })
  public photo: string | null;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date | undefined;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date | undefined;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.accountType = 'anonymous';
    this.username = null;
    this.photo = null;
  }
}
