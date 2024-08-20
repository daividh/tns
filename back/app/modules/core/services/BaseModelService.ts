import { BaseModelRepository } from '#modules/core/repositories/BaseModelRepository';
import { ICrudService } from '#modules/core/services/IBaseModelService';
import { NotFoundException } from '#modules/core/exceptions/NotFoundException';
import { IDbModel, IDbQueryNamespace, IQuery } from '#modules/core/types/types';

export class BaseModelService<T extends IDbModel, N extends IDbQueryNamespace>
  implements ICrudService<T, N>
{
  constructor(private repository: BaseModelRepository<T, N>) {}

  list(query: IQuery<N>): Promise<T['Select'][]> {
    return this.repository.list(query);
  }

  findOne(query: IQuery<N>) {
    return this.repository.findOne(query);
  }

  findById(id: T['PrimaryKeyType']): Promise<T['Select'] | undefined> {
    return this.repository.findById(id);
  }

  async findByIdOrThrow(id: T['PrimaryKeyType']): Promise<T['Select'] | undefined> {
    const model = await this.findById(id);
    if (model == null) {
      throw new NotFoundException();
    }
    return model;
  }

  async save(obj: T['Create']): Promise<T['Create']> {
    return this.repository.save(obj);
  }

  delete(id: T['PrimaryKeyType']): Promise<void> {
    return this.repository.delete(id);
  }
}
