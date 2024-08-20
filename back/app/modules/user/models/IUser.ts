import { IModel } from '#modules/core/models/IModel';

import { userAccount } from '#modules/user/database/UserSchema';

export type IUserDefinition = IModel<typeof userAccount>;
export type IUser = IUserDefinition['Select'];
export type INewUser = IUserDefinition['Create'];
