import { EntityRepository, Repository } from 'typeorm';
import { TemplateColumnDefinition } from '../entities';
import { ColumnDefinition as JsonColumnDefinition } from 'retro-board-common';
import uuid from 'uuid';

@EntityRepository(TemplateColumnDefinition)
export default class TemplateColumnDefinitionRepository extends Repository<
  TemplateColumnDefinition
> {
  async saveFromJson(
    colDef: JsonColumnDefinition,
    templateId: string
  ): Promise<void> {
    await this.save({
      ...colDef,
      id: colDef.id || uuid.v4(),
      template: { id: templateId },
    });
  }
}
