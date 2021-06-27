import { PlayerInstance } from './player';

const FIGHT_PLAYER_LIMIT = 2;

export class Fight {
  constructor(public players: PlayerInstance[]) {
    if (players.length > FIGHT_PLAYER_LIMIT) {
      throw new Error(`player max limit is ${FIGHT_PLAYER_LIMIT}`);
    }
  }

  play() {
    const [red, blue] = this.players;

    const redPower = red.player.stats.attack + red.player.stats.defense;
    const bludPower = blue.player.stats.attack + blue.player.stats.defense;

    while (red.player.stats.hp > 0 && blue.player.stats.hp > 0) {
      blue.player.stats.hp -= redPower;
      console.log(`${red.player.name}의 강력한 스트레이트! ${blue.player.name}에게 들어갑니다!!! (hp -${redPower})`);
    }
  }
}
