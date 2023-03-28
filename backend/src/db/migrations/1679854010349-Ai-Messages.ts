import { MigrationInterface, QueryRunner } from "typeorm";

export class AiMessages1679854010349 implements MigrationInterface {
    name = 'AiMessages1679854010349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ai_chat_messages" ("id" character varying NOT NULL, "role" character varying NOT NULL, "content" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "chat_id" character varying NOT NULL, CONSTRAINT "PK_68e330d1b2a3c5368bf6d2f67cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_312864ee92fd941771769c43e1" ON "ai_chat_messages" ("chat_id") `);
        await queryRunner.query(`CREATE TABLE "ai_chat" ("id" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, CONSTRAINT "PK_29ed612b3503cda55a5b05a1964" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bb5673675b010b4b948b8b363d" ON "ai_chat" ("created_by_id") `);
        await queryRunner.query(`ALTER TABLE "ai_chat_messages" ADD CONSTRAINT "FK_312864ee92fd941771769c43e19" FOREIGN KEY ("chat_id") REFERENCES "ai_chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_chat" ADD CONSTRAINT "FK_bb5673675b010b4b948b8b363d3" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ai_chat" DROP CONSTRAINT "FK_bb5673675b010b4b948b8b363d3"`);
        await queryRunner.query(`ALTER TABLE "ai_chat_messages" DROP CONSTRAINT "FK_312864ee92fd941771769c43e19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb5673675b010b4b948b8b363d"`);
        await queryRunner.query(`DROP TABLE "ai_chat"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_312864ee92fd941771769c43e1"`);
        await queryRunner.query(`DROP TABLE "ai_chat_messages"`);
    }

}
