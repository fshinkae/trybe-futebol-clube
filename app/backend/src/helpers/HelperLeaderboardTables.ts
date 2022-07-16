import IMatches from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/ILeaderboard';
import HelperLeaderboardRules from './HelperLeaderboardRules';

class HelperLeaderboardTables {
  public static filterIdCreator(database: IMatches[], homeOrAway: string, id: number) {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    if (homeOrAway === 'home') {
      return database.filter((match) => match.homeTeam === id);
    } return database.filter((match) => match.awayTeam === id);
  }

  public static leaderboardSort(database: ILeaderboard[]) {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    database.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return database;
  }

  public static leaderboardHome(database: IMatches[]) {
    return {
      totalPoints: HelperLeaderboardRules.pointsMatches(database, 'home'),
      totalGames: HelperLeaderboardRules.pointsGames(database),
      totalVictories: HelperLeaderboardRules.allMatchesVictories(database, 'home'),
      totalDraws: HelperLeaderboardRules.allMatchesDraws(database),
      totalLosses: HelperLeaderboardRules.allMatchesLosses(database, 'home'),
      goalsFavor: HelperLeaderboardRules.goalsInFavor(database, 'home'),
      goalsOwn: HelperLeaderboardRules.goalsOwn(database, 'home'),
      goalsBalance: HelperLeaderboardRules.balanceOfGoals(database, 'home'),
      efficiency: HelperLeaderboardRules.matchesEfficiency(database, 'home'),
    };
  }

  public static leaderboardAway(database: IMatches[]) {
    return {
      totalPoints: HelperLeaderboardRules.pointsMatches(database, 'away'),
      totalGames: HelperLeaderboardRules.pointsGames(database),
      totalVictories: HelperLeaderboardRules.allMatchesVictories(database, 'away'),
      totalDraws: HelperLeaderboardRules.allMatchesDraws(database),
      totalLosses: HelperLeaderboardRules.allMatchesLosses(database, 'away'),
      goalsFavor: HelperLeaderboardRules.goalsInFavor(database, 'away'),
      goalsOwn: HelperLeaderboardRules.goalsOwn(database, 'away'),
      goalsBalance: HelperLeaderboardRules.balanceOfGoals(database, 'away'),
      efficiency: HelperLeaderboardRules.matchesEfficiency(database, 'away'),
    };
  }

  public static allLeaderboard(homeDatabase: ILeaderboard, awayDatabase: ILeaderboard) {
    return {
      totalPoints: homeDatabase.totalPoints + awayDatabase.totalPoints,
      totalGames: homeDatabase.totalGames + awayDatabase.totalGames,
      totalVictories: homeDatabase.totalVictories + awayDatabase.totalVictories,
      totalDraws: homeDatabase.totalDraws + awayDatabase.totalDraws,
      totalLosses: homeDatabase.totalLosses + awayDatabase.totalLosses,
      goalsFavor: homeDatabase.goalsFavor + awayDatabase.goalsFavor,
      goalsOwn: homeDatabase.goalsOwn + awayDatabase.goalsOwn,
      goalsBalance: homeDatabase.goalsBalance + awayDatabase.goalsBalance,
      efficiency: Number((((homeDatabase.totalPoints + awayDatabase.totalPoints)
        / ((homeDatabase.totalGames + awayDatabase.totalGames) * 3)) * 100).toFixed(2)),
    };
  }
}

export default HelperLeaderboardTables;
