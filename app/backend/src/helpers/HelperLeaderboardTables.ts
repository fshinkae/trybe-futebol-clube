import IMatches from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/ILeaderboard';
import HelperLeaderboardRules from './HelperLeaderboardRules';

class HelperLeaderboardTables {
  public static filterIdCreator(data: IMatches[], homeOrAway: string, id: number) {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    if (homeOrAway === 'home') {
      return data.filter((match) => match.homeTeam === id);
    } return data.filter((match) => match.awayTeam === id);
  }

  public static leaderboardSort(data: ILeaderboard[]) {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    data.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return data;
  }

  public static leaderboardHome(data: IMatches[]) {
    return {
      totalPoints: HelperLeaderboardRules.pointsMatches(data, 'home'),
      totalGames: HelperLeaderboardRules.pointsGames(data),
      totalVictories: HelperLeaderboardRules.allMatchesVictories(data, 'home'),
      totalDraws: HelperLeaderboardRules.allMatchesDraws(data),
      totalLosses: HelperLeaderboardRules.allMatchesLosses(data, 'home'),
      goalsFavor: HelperLeaderboardRules.goalsInFavor(data, 'home'),
      goalsOwn: HelperLeaderboardRules.goalsOwn(data, 'home'),
      goalsBalance: HelperLeaderboardRules.balanceOfGoals(data, 'home'),
      efficiency: HelperLeaderboardRules.matchesEfficiency(data, 'home'),
    };
  }

  public static leaderboardAway(data: IMatches[]) {
    return {
      totalPoints: HelperLeaderboardRules.pointsMatches(data, 'away'),
      totalGames: HelperLeaderboardRules.pointsGames(data),
      totalVictories: HelperLeaderboardRules.allMatchesVictories(data, 'away'),
      totalDraws: HelperLeaderboardRules.allMatchesDraws(data),
      totalLosses: HelperLeaderboardRules.allMatchesLosses(data, 'away'),
      goalsFavor: HelperLeaderboardRules.goalsInFavor(data, 'away'),
      goalsOwn: HelperLeaderboardRules.goalsOwn(data, 'away'),
      goalsBalance: HelperLeaderboardRules.balanceOfGoals(data, 'away'),
      efficiency: HelperLeaderboardRules.matchesEfficiency(data, 'away'),
    };
  }

  public static allLeaderboard(homeData: ILeaderboard, awayData: ILeaderboard) {
    return {
      totalPoints: homeData.totalPoints + awayData.totalPoints,
      totalGames: homeData.totalGames + awayData.totalGames,
      totalVictories: homeData.totalVictories + awayData.totalVictories,
      totalDraws: homeData.totalDraws + awayData.totalDraws,
      totalLosses: homeData.totalLosses + awayData.totalLosses,
      goalsFavor: homeData.goalsFavor + awayData.goalsFavor,
      goalsOwn: homeData.goalsOwn + awayData.goalsOwn,
      goalsBalance: homeData.goalsBalance + awayData.goalsBalance,
      efficiency: Number((((homeData.totalPoints + awayData.totalPoints)
        / ((homeData.totalGames + awayData.totalGames) * 3)) * 100).toFixed(2)),
    };
  }
}

export default HelperLeaderboardTables;
