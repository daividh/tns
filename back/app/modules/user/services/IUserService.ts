import { ICrudService } from '#modules/core/services/IBaseModelService';

import { IUserDefinition } from '#modules/user/models/IUser';

export interface IUserService extends ICrudService<IUserDefinition, 'userAccount'> {}
