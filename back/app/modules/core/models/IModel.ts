import { PgTable, TableConfig } from 'drizzle-orm/pg-core';

export type IModel<T extends PgTable<TableConfig>> = {
  Schemas: T;
  Select: T['$inferSelect'];
  Create: T['$inferInsert'];
  PrimaryKeyType: T['$inferSelect']['id'];
};
