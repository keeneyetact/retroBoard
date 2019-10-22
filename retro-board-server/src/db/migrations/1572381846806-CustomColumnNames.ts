import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomColumnNames1572381846806 implements MigrationInterface {
    name = 'CustomColumnNames1572381846806'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sessions" ADD "wellLabel" character varying DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "notWellLabel" character varying DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "ideasLabel" character varying DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "maxUpVotes" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "maxDownVotes" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "maxDownVotes" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "maxUpVotes" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "ideasLabel"`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "notWellLabel"`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "wellLabel"`, undefined);
    }

}
