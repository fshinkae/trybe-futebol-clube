import ITeam from '../interfaces/ITeams';
import ModelTeams from '../database/models/ModelTeams';

class ServiceTeams {
  static async getAllTeams(): Promise<ITeam[]> {
    const allTeams = await ModelTeams.findAll();
    return allTeams as ITeam[];
  }

  static async getTeamById(id: number): Promise<ITeam> {
    const team = await ModelTeams.findByPk(id);
    return team as ITeam;
  }
}

export default ServiceTeams;
