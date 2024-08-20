import { and, eq, ne, SQLWrapper } from 'drizzle-orm';
import { PgSelectQueryBuilder, QueryBuilder } from 'drizzle-orm/pg-core';

import { userAccount } from '../database/UserSchema.js';
import { IQuery } from '#modules/core/types/types';

export class UserQueryPreset implements IQuery {
  private qb: PgSelectQueryBuilder;

  private filters: SQLWrapper[];

  private constructor() {
    this.qb = new QueryBuilder().select().from(userAccount).$dynamic();
    this.filters = [];
  }

  static create() {
    return new UserQueryPreset();
  }

  whereEmailEquals(email: string) {
    this.filters.push(eq(userAccount.email, email));
    return this;
  }

  whereUserIdNotEquals(userId: number) {
    this.filters.push(ne(userAccount.id, userId));
    return this;
  }

  first() {
    this.qb.limit(1);
    return this;
  }

  getBuilder(): PgSelectQueryBuilder {
    return this.qb.where(and(...this.filters));
  }
}
