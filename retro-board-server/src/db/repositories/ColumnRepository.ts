import { EntityRepository, Repository } from 'typeorm';
import { ColumnDefinition } from '../entities';
import { ColumnDefinition as JsonColumnDefinition, Session as JsonSession } from 'retro-board-common';
import { v4 } from 'uuid';

@EntityRepository(ColumnDefinition)
export default class ColumnDefinitionRepository extends Repository<
  ColumnDefinition
> {
  async saveFromJson(
    colDef: JsonColumnDefinition,
    sessionId: string
  ): Promise<void> {
    await this.save({
      ...colDef,
      id: colDef.id || v4(),
      session: { id: sessionId },
    });
  }

  async updateColumns(session: JsonSession,
    columns: JsonColumnDefinition[]): Promise<JsonColumnDefinition[]> {
      await this.delete({ session: { id: session.id }});
      const promises = columns.map(c => this.saveFromJson(c, session.id));
      await Promise.all(promises);
      return columns;
    }
}
