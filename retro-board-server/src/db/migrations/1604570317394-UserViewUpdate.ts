import {MigrationInterface, QueryRunner} from "typeorm";

export class UserViewUpdate1604570317394 implements MigrationInterface {
    name = 'UserViewUpdate1604570317394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."members" IS NULL`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ALTER COLUMN "members" SET DEFAULT '{}'::text[]`);
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
left join subscriptions s2 on u.email = ANY(s2.members)
left join subscriptions s3 on s3.domain = split_part(u.email, '@', 2) and s3.active is true
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","user_view","select \n\tu.id,\n\tu.name,\n\tu.\"accountType\",\n  u.username,\n  u.currency,\n\tu.\"stripeId\",\n\tu.photo,\n\tu.language,\n  u.email,\n  s.id as \"ownSubscriptionsId\",\n  s.plan as \"ownPlan\",\n\tcoalesce(s.id, s2.id, s3.id) as \"subscriptionsId\",\n  coalesce(s.active, s2.active, s3.active) as \"pro\",\n  coalesce(s.plan, s2.plan, s3.plan) as \"plan\"\nfrom users u \nleft join subscriptions s on s.\"ownerId\" = u.id and s.active is true\nleft join subscriptions s2 on u.email = ANY(s2.members)\nleft join subscriptions s3 on s3.domain = split_part(u.email, '@', 2) and s3.active is true"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","user_view"]);
        await queryRunner.query(`DROP VIEW "user_view"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ALTER COLUMN "members" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."members" IS NULL`);
    }

}
