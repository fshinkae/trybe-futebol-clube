import { Request, Response, NextFunction } from 'express';
import ServiceTeams from '../services/ServiceTeams';

class MiddlewareMatches {
  static async matchValidate(req: Request, res: Response, next: NextFunction):
  Promise <Response | void> {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    const getTeamById = await ServiceTeams.getTeamById(homeTeam || awayTeam);
    if (!getTeamById) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}

export default MiddlewareMatches;
