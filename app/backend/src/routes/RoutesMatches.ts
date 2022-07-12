import * as express from 'express';
import MiddlewareMatches from '../middlewares/MiddlewareMatches';
import ControllerMatches from '../controllers/ControllerMatches';
import MiddlewareToken from '../middlewares/MiddlewareToken';

class RoutesMatches {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.get(
      '/',
      ControllerMatches.getAllMatches,
    );
    this.router.post(
      '/',
      MiddlewareToken.tokenValidator,
      MiddlewareMatches.matchValidate,
      ControllerMatches.createMatch,
    );
    this.router.patch(
      '/:id/finish',
      ControllerMatches.finishMatch,
    );
  }
}

export default RoutesMatches;
