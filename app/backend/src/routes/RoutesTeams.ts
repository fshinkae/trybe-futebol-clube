import * as express from 'express';
import ControllerTeams from '../controllers/ControllerTeams';

class RotesTeams {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.get(
      '/',
      ControllerTeams.getAllTeams,
    );
    this.router.get(
      '/:id',
      ControllerTeams.getTeamById,
    );
  }
}

export default RotesTeams;
