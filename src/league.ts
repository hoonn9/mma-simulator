import { Fight } from './fight';
import { PlayerInstance } from './player';
import { Stage } from './stage';
import { Weight } from './types/weight';

type RaffleMethod = 'pov' | 'winCount' | 'loseCount';

interface LeagueImpl {
  weightClass: Weight;
  stage?: Stage;
  joinPlayers: (playerInstances: PlayerInstance | PlayerInstance[]) => void;
}

export class League implements LeagueImpl {
  playerInstances: PlayerInstance[] = [];
  stage?: Stage;

  constructor(private matchLength: number, public weightClass: Weight) {}

  async start(raffleMethod: RaffleMethod) {
    let players = [...this.playerInstances];

    while (players.length > 1) {
      const fights = this.raffleFight(players, raffleMethod);
      const stage = new Stage(fights);
      await stage.start();
      const winners = stage.winners;

      if (winners == null) {
        throw new Error('critical error');
      }

      players = winners;
    }

    const champion = players[0];
    console.log(`이번 리그의 챔피언은 ${champion.player.name}입니다!!!`);
  }

  createFights(players: PlayerInstance[]) {
    const isUnearnedWin = players.length % 2;

    const fights: Fight[] = [];

    for (let i = 0; i < players.length; i += 2) {
      fights.push(new Fight([players[i], players[i + 1]]));
    }

    /**
     * @TODO
     * 플레이어 홀수 참여 시 부전승 추가
     */

    return fights;
  }

  raffleFight(players: PlayerInstance[], raffleMethod: RaffleMethod) {
    let sortedPlayers: PlayerInstance[] = [];
    switch (raffleMethod) {
      case 'pov':
        sortedPlayers = players.sort((a, b) => a.player.grade.pov - b.player.grade.pov);
        break;
      case 'winCount':
        sortedPlayers = players.sort((a, b) => b.player.grade.total.win - a.player.grade.total.win);
        break;
      case 'loseCount':
        sortedPlayers = players.sort((a, b) => b.player.grade.total.lose - a.player.grade.total.lose);
        break;
      default:
        throw new Error(`${raffleMethod} is not raffle method 😭`);
    }
    const fights = this.createFights(sortedPlayers);

    this.printFightRaffle(fights);
    return fights;
  }

  printFightRaffle(fights: Fight[]) {
    fights.forEach((fight, index) => {
      console.log(`${index + 1}조`);
      fight.players.forEach((player) => {
        console.log(`${player.player.name} 선수`);
      });
    });
  }

  private checkPlayer(playerInstance: PlayerInstance) {
    const difference = this.weightClass.limit.difference || 0;
    if (this.weightClass.limit.weightLimit + difference < playerInstance.player.weight) {
      throw new Error(`해당 리그에 참여할 수 없는 플레이어 입니다. (league weight class: ${this.weightClass.name})`);
    }
  }

  joinPlayers(playerInstances: PlayerInstance | PlayerInstance[]) {
    if (Array.isArray(playerInstances)) {
      playerInstances.forEach((player) => this.checkPlayer(player));

      if (playerInstances.length + this.playerInstances.length > this.matchLength) {
        throw new Error('플레이어 인원 초과입니다.');
      }
      this.playerInstances.push(...playerInstances);
    } else {
      this.checkPlayer(playerInstances);
      if (this.playerInstances.length + 1 > this.matchLength) {
        throw new Error('플레이어 인원 초과입니다.');
      }
      this.playerInstances.push(playerInstances);
    }
  }
}
