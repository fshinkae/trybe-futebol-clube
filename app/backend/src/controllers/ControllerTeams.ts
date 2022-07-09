import { Request, Response } from 'express';
import ServiceTeams from '../services/ServiceTeams';

class ControllerTeams {
  static async getAllTeams(_req: Request, res: Response): Promise<Response | void> {
    try {
      const allTeams = await ServiceTeams.getAllTeams();
      return res.status(200).json(allTeams);
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  }
}

export default ControllerTeams;
