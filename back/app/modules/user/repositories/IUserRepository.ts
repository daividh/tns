import { IRepository } from '#modules/core/repositories/IBaseModelRepository';

import { IUserDefinition } from '#modules/user/models/IUser';

export interface IUserRepository extends IRepository<IUserDefinition, 'userAccount'> {}
