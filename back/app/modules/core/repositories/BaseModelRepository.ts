import { eq } from 'drizzle-orm';
import { assign } from 'radash';

import { Database } from '#modules/database/Database';

import { IRepository } from '#modules/core/repositories/IBaseModelRepository';
import { TooMuchResultsException } from '#modules/core/exceptions/TooMuchResultsException';
import { IDbModel, IDbQueryNamespace, IQuery } from '#modules/core/types/types';

export class BaseModelRepository<T extends IDbModel, N extends IDbQueryNamespace>
  implements IRepository<T, N>
{
  constructor(
    private db: Database,
    private schema: T['Schemas'],
    private queryNameSpace: N,
  ) {}

  list(query: IQuery<N>): Promise<T['Select'][]> {
    return this.getDb().query[this.queryNameSpace].findMany(query);
  }

  async findOne(query: IQuery<N>): Promise<T['Select'] | undefined> {
    const result = await this.getDb().query[this.queryNameSpace].findMany({
      ...query,
      limit: 2,
    });

    if (result.length > 1) {
      throw new TooMuchResultsException();
    }

    return result[0];
  }

  findById(id: T['PrimaryKeyType']): Promise<T['Select'] | undefined> {
    return this.getDb().query[this.queryNameSpace].findFirst({
      where: eq(
        // @ts-expect-error
        this.schema['id'],
        id,
      ),
    });
  }

  async save(obj: T['Create']): Promise<T['Create']> {
    if (obj.id) {
      const existingModel = await this.findById(obj.id);

      // @ts-expect-error
      const mergedObject = assign(existingModel, obj);

      return this.getDb()
        .update(this.schema)
        .set(mergedObject)
        .where(
          eq(
            // @ts-expect-error
            this.schema.id,
            obj.id,
          ),
        )
        .returning();
    }

    return this.getDb().insert(this.schema).values(obj).returning();
  }

  delete(id: T['PrimaryKeyType']): Promise<void> {
    this.getDb().delete(this.schema).where(
      eq(
        // @ts-expect-error
        this.schema['id'],
        id,
      ),
    );
    return Promise.resolve();
  }

  private getDb() {
    return this.db.getDb();
  }
}
