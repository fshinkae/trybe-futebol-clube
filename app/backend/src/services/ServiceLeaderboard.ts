import ITeams from '../interfaces/ITeams';
import HelperLeaderboardTables from '../helpers/HelperLeaderboardTables';
import ModelMatches from '../database/models/ModelMatches';
import ModelTeams from '../database/models/ModelTeams';

class ServiceLeaderboard {
  public static async getAllHomeDatabase() {
    const findAllMatches = await ModelMatches.findAll({ where: { inProgress: false } });
    const findAllTeams = await ModelTeams.findAll();
    const leaderboardMap = findAllTeams.map((teams: ITeams) => {
      const homeOrAwayFilter = HelperLeaderboardTables
        .filterIdCreator(findAllMatches, 'home', teams.id);

      const homeDatabase = HelperLeaderboardTables.leaderboardHome(homeOrAwayFilter);

      return { name: teams.teamName, ...homeDatabase };
    });
    return HelperLeaderboardTables.leaderboardSort(leaderboardMap);
  }

  public static async getAllAwayDatabase() {
    const findAllMatches = await ModelMatches.findAll({ where: { inProgress: false } });
    const findAllTeams = await ModelTeams.findAll();
    const leaderboardMap = findAllTeams.map((teams: ITeams) => {
      const homeOrAwayFilter = HelperLeaderboardTables
        .filterIdCreator(findAllMatches, 'away', teams.id);

      const awayDatabase = HelperLeaderboardTables.leaderboardAway(homeOrAwayFilter);
      return { name: teams.teamName, ...awayDatabase };
    });
    return HelperLeaderboardTables.leaderboardSort(leaderboardMap);
  }

  public static async getAllDatabase() {
    const findAllMatches = await ModelMatches.findAll({ where: { inProgress: false } });
    const findAllTeams = await ModelTeams.findAll();
    const leaderboardMap = findAllTeams.map((teams: ITeams) => {
      const filterHome = HelperLeaderboardTables.filterIdCreator(findAllMatches, 'home', teams.id);
      const filterAway = HelperLeaderboardTables.filterIdCreator(findAllMatches, 'away', teams.id);
      const homeDatabase = HelperLeaderboardTables.leaderboardHome(filterHome);
      const awayDatabase = HelperLeaderboardTables.leaderboardAway(filterAway);
      const allDatabase = HelperLeaderboardTables.allLeaderboard(homeDatabase, awayDatabase);
      return { name: teams.teamName, ...allDatabase };
    });
    return HelperLeaderboardTables.leaderboardSort(leaderboardMap);
  }
}

export default ServiceLeaderboard;
