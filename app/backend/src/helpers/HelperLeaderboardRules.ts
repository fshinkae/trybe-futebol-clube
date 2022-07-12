import IMatches from '../interfaces/IMatches';

class HelperLeaderboardRules {
  // auxiliar para tabela leader board

  public static pointsMatches(data: IMatches[], homeOrAway: string) {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    const win = 3;
    const draw = 1;
    if (homeOrAway === 'home') {
      return data.reduce((previousValue, currentValue) => {
        if (currentValue.homeTeamGoals > currentValue.awayTeamGoals) {
          return previousValue + win;
        } if (currentValue.homeTeamGoals === currentValue.awayTeamGoals) {
          return previousValue + draw;
        } return previousValue;
      }, 0);
    }
    return data.reduce((previousValue, currentValue) => {
      if (currentValue.homeTeamGoals < currentValue.awayTeamGoals) {
        return previousValue + win;
      } if (currentValue.homeTeamGoals === currentValue.awayTeamGoals) {
        return previousValue + draw;
      } return previousValue;
    }, 0);
  }

  public static pointsGames(data: IMatches[]) {
    return data.length;
  }

  public static allMatchesVictories(data: IMatches[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    } return data.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }

  public static allMatchesDraws(data: IMatches[]) {
    return data.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  public static allMatchesLosses(data: IMatches[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    } return data.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  public static goalsInFavor(data: IMatches[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.reduce((previousValue, currentValue) =>
        previousValue + currentValue.homeTeamGoals, 0);
    }
    return data.reduce((previousValue, currentValue) =>
      previousValue + currentValue.awayTeamGoals, 0);
  }

  public static goalsOwn(data: IMatches[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.reduce((previousValue, currentValue) =>
        previousValue + currentValue.awayTeamGoals, 0);
    }
    return data.reduce((previousValue, currentValue) =>
      previousValue + currentValue.homeTeamGoals, 0);
  }

  public static balanceOfGoals(data: IMatches[], homeOrAway: string) {
    const helper = HelperLeaderboardRules;
    if (homeOrAway === 'home') {
      return helper.goalsInFavor(data, 'home') - helper.goalsOwn(data, 'home');
    }
    return helper.goalsInFavor(data, 'away') - helper.goalsOwn(data, 'away');
  }

  public static matchesEfficiency(data: IMatches[], homeOrAway: string) {
    const helper = HelperLeaderboardRules;
    if (homeOrAway === 'home') {
      const totalPoints = helper.pointsMatches(data, 'home');
      const totalGames = helper.pointsGames(data);
      return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    }
    const totalPoints = helper.pointsMatches(data, 'away');
    const totalGames = helper.pointsGames(data);
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }
}

export default HelperLeaderboardRules;
