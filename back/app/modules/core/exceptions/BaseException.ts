import { Exception } from '@adonisjs/core/exceptions';
import { HttpContext } from '@adonisjs/core/http';

export class BaseException extends Exception {
  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ err: error }, error.message);
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({ error: error.message });
  }
}
