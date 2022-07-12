import ITeams from '../interfaces/ITeams';
import HelperLeaderboardTables from '../helpers/HelperLeaderboardTables';
import ModelMatches from '../database/models/ModelMatches';
import ModelTeams from '../database/models/ModelTeams';

class ServiceLeaderboard {
  public static async getAllHomeDatabase() {
    const allMatches = await ModelMatches.findAll({ where: { inProgress: false } });
    const allTeams = await ModelTeams.findAll();
    const teamsMap = allTeams.map((teams: ITeams) => {
      const homeOrAwayFilter = HelperLeaderboardTables
        .filterIdCreator(allMatches, 'home', teams.id);

      const homeDatabase = HelperLeaderboardTables.leaderboardHome(homeOrAwayFilter);

      return { name: teams.teamName, ...homeDatabase };
    });
    return HelperLeaderboardTables.leaderboardSort(teamsMap);
  }

  public static async getAllAwayDatase() {
    const allMatches = await ModelMatches.findAll({ where: { inProgress: false } });
    const allTeams = await ModelTeams.findAll();
    const teamsMap = allTeams.map((teams: ITeams) => {
      const homeOrAwayFilter = HelperLeaderboardTables
        .filterIdCreator(allMatches, 'away', teams.id);

      const awayDatabase = HelperLeaderboardTables.leaderboardAway(homeOrAwayFilter);
      return { name: teams.teamName, ...awayDatabase };
    });
    return HelperLeaderboardTables.leaderboardSort(teamsMap);
  }
}

export default ServiceLeaderboard;
