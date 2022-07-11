import * as express from 'express';
import ControllerMatches from '../controllers/ControllerMatches';

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
      ControllerMatches.createMatch,
    );
    this.router.patch(
      '/:id/finish',
      ControllerMatches.finishMatch,
    );
  }
}

export default RoutesMatches;
