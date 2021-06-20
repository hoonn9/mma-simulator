import { Player } from './player';
import { Weight } from './types/weight';

interface LeagueImpl {
  weightClass: Weight;
}

export class League implements LeagueImpl {
  players: Player[] = [];
  constructor(private matchLength: number, public weightClass: Weight) {}

  private checkPlayer(player: Player) {
    const difference = this.weightClass.limit.difference || 0;
    if (this.weightClass.limit.weightLimit + difference < player.weight) {
      throw new Error(`해당 리그에 참여할 수 없는 플레이어 입니다. (league weight class: ${this.weightClass.name})`);
    }
  }
  joinPlayers(players: Player | Player[]) {
    if (Array.isArray(players)) {
      players.forEach((player) => this.checkPlayer(player));

      if (players.length + this.players.length > this.matchLength) {
        throw new Error('플레이어 인원 초과입니다.');
      }
      this.players.push(...players);
    } else {
      this.checkPlayer(players);
      if (this.players.length + 1 > this.matchLength) {
        throw new Error('플레이어 인원 초과입니다.');
      }
      this.players.push(players);
    }
  }
}
