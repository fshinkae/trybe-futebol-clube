import { Request, Response } from 'express';
import ServiceMatches from '../services/ServiceMatches';

class ControllerMatches {
  static async getAllMatches(req: Request, res: Response): Promise<Response | void> {
    try {
      const { inProgress } = req.body;
      if (!inProgress) {
        const allMatches = await ServiceMatches.getAllMatches();
        return res.status(200).json(allMatches);
      }
      const trueProgress = inProgress === 'true';
      const matchesInProgress = await ServiceMatches.getMatchesInProgress(trueProgress);
      return res.status(200).json(matchesInProgress);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default ControllerMatches;
