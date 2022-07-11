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

  // Created fo suport patch in /:id/finish
  public static async selectMatchById(id: number): Promise<IMatches> {
    const match = await ModelMatches.findOne({
      where: { id },
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
    return match as unknown as IMatches;
  }

  public static async finishMatch(id: number) {
    const inProgress = false;
    await ModelMatches.update({ inProgress }, { where: { id } });

    return id;
  }
}

export default ServiceMatches;
