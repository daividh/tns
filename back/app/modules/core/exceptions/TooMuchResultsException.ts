import { BaseException } from '#modules/core/exceptions/BaseException';

export class TooMuchResultsException extends BaseException {
  static status = 500;
  static code = 'E_TOO_MUCH_RESULTS';

  constructor() {
    super('Too much results');
  }
}
