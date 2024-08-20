import { relations } from 'drizzle-orm';
import { integer, pgSchema, serial, text } from 'drizzle-orm/pg-core';

export const tnsSchema = pgSchema('tns');

export const userAccount = tnsSchema.table('UserAccount', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const usersAccountRelation = relations(userAccount, ({ many }) => ({
  post: many(post),
}));

export const usersAddressRelation = relations(userAccount, ({ many }) => ({
  address: many(address),
}));

export const post = tnsSchema.table('Post', {
  id: serial('id').primaryKey(),
  title: text('name').notNull(),
  authorId: integer('authorId').references(() => userAccount.id),
});

export const postsRelations = relations(post, ({ one }) => ({
  author: one(userAccount, {
    fields: [post.authorId],
    references: [userAccount.id],
  }),
}));

export const address = tnsSchema.table('Address', {
  id: serial('id').primaryKey(),
  title: text('name').notNull(),
  userId: integer('userId').references(() => userAccount.id),
});

export const addressRelations = relations(address, ({ one }) => ({
  author: one(userAccount, {
    fields: [address.userId],
    references: [userAccount.id],
  }),
}));

export type INewUserAccount = typeof userAccount.$inferInsert;
export type IUserAccount = typeof userAccount.$inferSelect;
