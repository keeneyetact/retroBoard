import { Column } from 'typeorm';

export default class TrackingEntity {
  @Column({ nullable: true, type: 'character varying' })
  public campaignId: string | null;
  @Column({ nullable: true, type: 'character varying' })
  public creativeId: string | null;
  @Column({ nullable: true, type: 'character varying' })
  public device: string | null;
  @Column({ nullable: true, type: 'character varying' })
  public keyword: string | null;
  @Column({ nullable: true, type: 'character varying' })
  public gclid: string | null;

  constructor() {
    this.campaignId = null;
    this.creativeId = null;
    this.device = null;
    this.keyword = null;
    this.gclid = null;
  }
}
