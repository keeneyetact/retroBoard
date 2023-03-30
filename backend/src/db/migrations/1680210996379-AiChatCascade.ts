import { MigrationInterface, QueryRunner } from "typeorm";

export class AiChatCascade1680210996379 implements MigrationInterface {
    name = 'AiChatCascade1680210996379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ai_chat_messages" DROP CONSTRAINT "FK_312864ee92fd941771769c43e19"`);
        await queryRunner.query(`ALTER TABLE "ai_chat_messages" ADD CONSTRAINT "FK_312864ee92fd941771769c43e19" FOREIGN KEY ("chat_id") REFERENCES "ai_chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ai_chat_messages" DROP CONSTRAINT "FK_312864ee92fd941771769c43e19"`);
        await queryRunner.query(`ALTER TABLE "ai_chat_messages" ADD CONSTRAINT "FK_312864ee92fd941771769c43e19" FOREIGN KEY ("chat_id") REFERENCES "ai_chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
