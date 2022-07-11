import { Request, Response } from 'express';
import ServiceMatches from '../services/ServiceMatches';

class ControllerMatches {
  static async getAllMatches(req: Request, res: Response): Promise<Response | void> {
    try {
      const allMatches = await ServiceMatches.getAllMatches();
      return res.status(200).json(allMatches);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default ControllerMatches;
