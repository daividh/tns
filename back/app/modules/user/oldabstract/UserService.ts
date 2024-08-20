import { BaseModelService } from '#modules/core/services/BaseModelService';

import { IUserService } from '#modules/user/services/IUserService';
import { IUserDefinition } from '#modules/user/models/IUser';

export abstract class UserService
  extends BaseModelService<IUserDefinition, 'userAccount'>
  implements IUserService {}
