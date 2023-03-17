import { MigrationInterface, QueryRunner } from "typeorm";

export class trackedAt1679043892889 implements MigrationInterface {
    name = 'trackedAt1679043892889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "tracking_tracked_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tracking_tracked_at"`);
    }

}
