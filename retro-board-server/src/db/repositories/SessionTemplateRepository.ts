import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { SessionTemplateEntity } from '../entities';
import {
  SessionTemplate as JsonSessionTemplate,
  ColumnDefinition as JsonColumnDefinition,
  SessionOptions as JsonSessionOptions,
} from 'retro-board-common/src/types';
import { v4 } from 'uuid';
import { TemplateColumnRepository } from '.';

@EntityRepository(SessionTemplateEntity)
export default class SessionTemplateRepository extends Repository<
  SessionTemplateEntity
> {
  async saveFromJson(
    name: string,
    columns: JsonColumnDefinition[],
    options: JsonSessionOptions,
    authorId: string
  ): Promise<JsonSessionTemplate> {
    const template = {
      id: v4(),
      name,
      columns,
      options,
      createdBy: { id: authorId },
    };

    const columnsRepo = getCustomRepository(TemplateColumnRepository);
    const createdTemplate = await this.save(template);

    for (let i = 0; i < columns.length; i++) {
      await columnsRepo.saveFromJson(columns[i], createdTemplate.id); // TODO
    }

    return {
      ...createdTemplate,
      createdBy: createdTemplate.createdBy.toJson(),
    };
  }
}
