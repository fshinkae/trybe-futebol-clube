import { Request, Response } from 'express';
import ServiceLeaderboard from '../services/ServiceLeaderboard';

class ControllerLeaderboard {
  public static async getAllHomeDatabase(req: Request, res: Response) {
    try {
      const leaderboardHome = await ServiceLeaderboard.getAllHomeDatabase();
      res.status(200).json(leaderboardHome);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public static async getAllAwayDatabase(req: Request, res: Response) {
    try {
      const leaderboardAway = await ServiceLeaderboard.getAllAwayDatabase();
      res.status(200).json(leaderboardAway);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public static async getAllDatabase(req: Request, res: Response) {
    try {
      const leaderboardAll = await ServiceLeaderboard.getAllDatabase();
      res.status(200).json(leaderboardAll);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default ControllerLeaderboard;
