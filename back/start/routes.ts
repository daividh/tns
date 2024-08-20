/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const UserController = () => import('#modules/user/http/controllers/UserController');
const AuthenticationController = () =>
  import('#modules/authentication/http/controllers/AuthenticationController');

router.group(() => {});

router.post('login', [AuthenticationController, 'login']);

router
  .resource('users', UserController)
  .where('id', router.matchers.number())
  .apiOnly()
  .use(
    ['index', 'show', 'update', 'destroy'],
    middleware.auth({
      guards: ['jwt'],
    }),
  );
