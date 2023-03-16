import { MigrationInterface, QueryRunner } from "typeorm";

export class tracking1678985862753 implements MigrationInterface {
    name = 'tracking1678985862753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "tracking_campaign_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tracking_creative_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tracking_device" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tracking_keyword" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tracking_gclid" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tracking_gclid"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tracking_keyword"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tracking_device"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tracking_creative_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tracking_campaign_id"`);
    }

}
