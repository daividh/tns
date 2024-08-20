import { Database } from '#modules/database/Database';

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    db: ReturnType<Database['getDb']>;
  }
}
