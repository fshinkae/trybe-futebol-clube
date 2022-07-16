import * as express from 'express';
import ControllerLeaderboard from '../controllers/ControllerLeaderboard';

class RoutesLeaderboard {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.get(
      '/home',
      ControllerLeaderboard.getAllHomeDatabase,
    );
    this.router.get(
      '/away',
      ControllerLeaderboard.getAllAwayDatabase,
    );
    this.router.get(
      '/',
      ControllerLeaderboard.getAllDatabase,
    );
  }
}

export default RoutesLeaderboard;
