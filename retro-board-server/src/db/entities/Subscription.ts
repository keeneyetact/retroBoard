import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import UserEntity from './User';
import { Plan } from 'retro-board-common/src';

@Entity({ name: 'subscriptions' })
export default class SubscriptionEntity {
  @PrimaryColumn({ primary: true, generated: false, unique: true })
  public id: string;
  @Column({ nullable: false, default: false })
  public active: boolean;
  @Column({ nullable: false, type: 'character varying' })
  public plan: Plan;
  @ManyToOne(() => UserEntity, { eager: true, cascade: true, nullable: false })
  public owner: UserEntity;
  @Column({ nullable: true, type: 'character varying' })
  public domain: string | null;
  @Column('text', { array: true, default: '{}' })
  public members: string[];
  @CreateDateColumn({ type: 'timestamp with time zone', select: false })
  public created: Date | undefined;
  @UpdateDateColumn({ type: 'timestamp with time zone', select: false })
  public updated: Date | undefined;
  constructor(id: string, owner: UserEntity, plan: Plan) {
    this.id = id;
    this.owner = owner;
    this.active = true;
    this.plan = plan;
    this.domain = null;
    this.members = [];
  }
}
