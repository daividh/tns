import { IDbModel, IDbQueryNamespace, IQuery } from '../types/types.js';

export interface IRepository<T extends IDbModel, N extends IDbQueryNamespace> {
  list(query: IQuery<N>): Promise<T['Select'][]>;
  findOne(query: IQuery<N>): Promise<T['Select'] | undefined>;
  findById(id: T['PrimaryKeyType']): Promise<T['Select'] | undefined>;
  save(obj: T['Create']): Promise<T['Create']>;
  delete(obj: T['PrimaryKeyType']): Promise<void>;
}
