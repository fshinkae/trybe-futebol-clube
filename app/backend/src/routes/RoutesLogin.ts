import * as express from 'express';
import MiddlewareLogin from '../middlewares/MiddlewareLogin';
import ControllerLogin from '../controllers/ControllerLogin';

class RoutesLogin {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.post(
      '/',
      MiddlewareLogin.emailValidator,
      MiddlewareLogin.passwordValidator,
      ControllerLogin.loginSuccess,
    );
    this.router.get(
      '/validate',
      ControllerLogin.loginValidator,
    );
  }
}

export default RoutesLogin;
