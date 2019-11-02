import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { IconName } from 'retro-board-common';
import Session from './Session';

@Entity({ name: 'columns' })
export default class ColumnDefinition {
  @PrimaryColumn({ primary: true, generated: true, unique: true })
  public id: string;
  @ManyToOne(() => Session, { nullable: false })
  public session: Session;
  @Column()
  public type: string;
  @Column()
  public index: number;
  @Column()
  public label: string;
  @Column()
  public color: string;
  @Column({ nullable: true, type: 'character varying' })
  public icon: IconName | null;
  constructor(
    id: string,
    session: Session,
    type: string,
    index: number,
    label: string,
    color: string,
    icon?: IconName
  ) {
    this.id = id;
    this.type = type;
    this.session = session;
    this.index = index;
    this.label = label;
    this.color = color;
    this.icon = icon || null;
  }
}
