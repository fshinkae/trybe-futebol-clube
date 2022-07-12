import { Request, Response } from 'express';
import ServiceLeaderboard from '../services/ServiceLeaderboard';

class ControllerLeaderboard {
  public static async getAllHomeDatabase(req: Request, res: Response) {
    try {
      const leaderboard = await ServiceLeaderboard.getAllHomeDatabase();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public static async getAllAwayDatabase(req: Request, res: Response) {
    try {
      const leaderboard = await ServiceLeaderboard.getAllAwayDatase();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default ControllerLeaderboard;
