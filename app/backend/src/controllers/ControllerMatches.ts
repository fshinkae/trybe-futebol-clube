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

  static async createMatch(req: Request, res: Response): Promise<Response | void> {
    try {
      const match = await ServiceMatches.createMatch(req.body);
      if (!match) {
        return res.status(401).json({ message: 'invalid matches' });
      }
      return res.status(201).json(match);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async finishMatch(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const matchSelectById = await ServiceMatches.selectMatchById(Number(id));
      if (!matchSelectById) {
        return res.status(401).json({ message: 'No has match in database' });
      }
      if (matchSelectById.inProgress === false) {
        return res.status(401).json({ message: 'Match is finished' });
      }
      await ServiceMatches.finishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async updateMatch(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const matchId = await ServiceMatches.selectMatchById(Number(id));
      if (!matchId) {
        return res.status(401).json({ message: 'No have match by id' });
      }
      if (matchId.inProgress === false) {
        return res.status(401).json({
          message: 'Unable to update a match with in progress status' });
      }
      const match = await ServiceMatches.updateMatch({ id, homeTeamGoals, awayTeamGoals });
      return res.status(200).json(match);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default ControllerMatches;
