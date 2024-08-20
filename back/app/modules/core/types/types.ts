import { TableConfig } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';

import { Database } from '#modules/database/Database';

import { IModel } from '#modules/core/models/IModel';

export type IDbModel = IModel<PgTable<TableConfig>>;
export type IDbQueryNamespace = keyof ReturnType<Database['getDb']>['query'];
export type IQuery<N extends IDbQueryNamespace> = Parameters<
  ReturnType<Database['getDb']>['query'][N]['findMany']
>[0];
