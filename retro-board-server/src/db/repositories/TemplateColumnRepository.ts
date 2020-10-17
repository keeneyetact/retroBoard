import { EntityRepository, Repository } from 'typeorm';
import { TemplateColumnDefinitionEntity } from '../entities';
import { ColumnDefinition as JsonColumnDefinition } from 'retro-board-common';
import { v4 } from 'uuid';

@EntityRepository(TemplateColumnDefinitionEntity)
export default class TemplateColumnDefinitionRepository extends Repository<
  TemplateColumnDefinitionEntity
> {
  async saveFromJson(
    colDef: JsonColumnDefinition,
    templateId: string
  ): Promise<void> {
    await this.save({
      ...colDef,
      id: colDef.id || v4(),
      template: { id: templateId },
    });
  }
}
