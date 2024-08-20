import pg, { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres/driver';

import * as UserSchema from '#modules/user/database/UserSchema';

export class Database {
  private client: Client;

  constructor() {
    this.client = new pg.Client({
      connectionString: 'postgresql://postgres:example@localhost:5432/tns',
    });
  }

  async connect() {
    await this.client.connect();
  }

  getDb() {
    return drizzle(this.client, {
      schema: {
        ...UserSchema,
      },
    });
  }
}
