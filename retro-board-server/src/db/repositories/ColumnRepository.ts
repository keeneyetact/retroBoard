import { EntityRepository, Repository } from 'typeorm';
import { ColumnDefinition } from '../entities';
import { ColumnDefinition as JsonColumnDefinition } from 'retro-board-common';

@EntityRepository(ColumnDefinition)
export default class ColumnDefinitionRepository extends Repository<
  ColumnDefinition
> {
  async saveFromJson(
    colDef: JsonColumnDefinition,
    sessionId: string
  ): Promise<void> {
    await this.save({ ...colDef, session: { id: sessionId } });
  }
}
