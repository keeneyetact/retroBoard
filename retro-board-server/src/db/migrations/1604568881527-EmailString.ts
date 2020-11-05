import {MigrationInterface, QueryRunner} from "typeorm";

export class EmailString1604568881527 implements MigrationInterface {
    name = 'EmailString1604568881527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP VIEW "user_view"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "members" text array NOT NULL DEFAULT array[]::text[]`);
        await queryRunner.query(`ALTER TABLE "subscriptions-users" DROP CONSTRAINT "FK_b05891b70145228739e2a7b29b4"`);
        await queryRunner.query(`ALTER TABLE "subscriptions-users" DROP CONSTRAINT "FK_dccc47d20a8793f7bcb417cd57e"`);
        await queryRunner.query(`DROP INDEX "IDX_b05891b70145228739e2a7b29b"`);
        await queryRunner.query(`DROP INDEX "IDX_dccc47d20a8793f7bcb417cd57"`);
        await queryRunner.query(`DROP TABLE "subscriptions-users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "members"`);
        await queryRunner.query(`CREATE TABLE "subscriptions-users" ("subscriptionsId" character varying NOT NULL, "usersId" character varying NOT NULL, CONSTRAINT "PK_00cd7f2adab9f3397e5f2edf769" PRIMARY KEY ("subscriptionsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dccc47d20a8793f7bcb417cd57" ON "subscriptions-users" ("subscriptionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b05891b70145228739e2a7b29b" ON "subscriptions-users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "subscriptions-users" ADD CONSTRAINT "FK_dccc47d20a8793f7bcb417cd57e" FOREIGN KEY ("subscriptionsId") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions-users" ADD CONSTRAINT "FK_b05891b70145228739e2a7b29b4" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "user_view" AS 
select 
	u.id,
	u.name,
	u."accountType",
  u.username,
  u.currency,
	u."stripeId",
	u.photo,
	u.language,
  u.email,
  s.id as "ownSubscriptionsId",
  s.plan as "ownPlan",
	coalesce(s.id, s2.id, s3.id) as "subscriptionsId",
  coalesce(s.active, s2.active, s3.active) as "pro",
  coalesce(s.plan, s2.plan, s3.plan) as "plan"
from users u 
left join subscriptions s on s."ownerId" = u.id and s.active is true
left join "subscriptions-users" su on su."usersId" = u.id
left join subscriptions s2 on s2.id = su."subscriptionsId" and s2.active is true
left join subscriptions s3 on s3.domain = split_part(u.email, '@', 2) and s3.active is true
  `);
    }

}
