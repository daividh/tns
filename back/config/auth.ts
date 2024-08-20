import { defineConfig } from '@adonisjs/auth';
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens';
import type { InferAuthEvents, Authenticators } from '@adonisjs/auth/types';
import { JwtGuard } from '../app/modules/authentication/guards/JwtGuard.js';
import env from '#start/env';
import UserProvider from '#modules/authentication/UserProvider';

const authConfig = defineConfig({
  default: 'api',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/user'),
      }),
    }),
    jwt: {
      resolver: async (_name, app) => {
        const userProvider = await app.container.make(UserProvider);
        return (ctx) => {
          return new JwtGuard(ctx, userProvider, {
            secret: env.get('APP_KEY'),
          });
        };
      },
    },
  },
});

export default authConfig;

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
