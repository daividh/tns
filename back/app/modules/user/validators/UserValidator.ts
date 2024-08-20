import vine, { BaseLiteralType } from '@vinejs/vine';
import app from '@adonisjs/core/services/app';
import { AbstractUserService } from '#modules/user/services/AbstractUserService';
import { OptionalModifier, NullableModifier } from '@vinejs/vine/schema/base/literal';
import { and, eq, ne } from 'drizzle-orm';
import { userAccount } from '#modules/user/database/UserSchema';

const id = vine.number().withoutDecimals().positive();

const optNull = <T, V, B>(
  value: BaseLiteralType<T, V, B>,
): OptionalModifier<NullableModifier<BaseLiteralType<T, V, B>>> => {
  return value.nullable().optional();
};

const email = vine
  .string()
  .trim()
  .email()
  .unique(async (_adb, emailToCheck, field) => {
    const userIdToExclude = field.meta.userId;

    const userService = await app.container.make(AbstractUserService);

    return (
      (await userService.findOne({
        where: and(
          eq(userAccount.email, emailToCheck),
          userIdToExclude != null ? ne(userAccount.id, userIdToExclude) : undefined,
        ),
      })) == null
    );
  });

/**
 * Validates the post's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    email: email,
    name: vine.string(),
  }),
);

/**
 * Validates the post's creation action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    id,
    name: vine.string(),
    email: email,
  }),
);
