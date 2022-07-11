import IMatches from '../interfaces/IMatches';
import ICreateMatches from '../interfaces/ICreateMatches';
import ModelMatches from '../database/models/ModelMatches';
import ModelTeams from '../database/models/ModelTeams';

class ServiceMatches {
  public static async getAllMatches(): Promise<IMatches[]> {
    const allMatches = await ModelMatches.findAll({
      include: [{
        model: ModelTeams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: ModelTeams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return allMatches as unknown as IMatches[];
  }

  public static async getMatchesInProgress(inProgress: boolean): Promise<IMatches[]> {
    const matches = await ModelMatches.findAll({
      where: { inProgress },
      include: [{
        model: ModelTeams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: ModelTeams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches as unknown as IMatches[];
  }

  public static async createMatch(match: ICreateMatches): Promise<ICreateMatches> {
    const newMatch = await ModelMatches.create(match);
    return newMatch as ICreateMatches;
  }
}

export default ServiceMatches;
