import { BANTOM_CLASS } from './constants/weight';
import { League } from './league';
import { PlayerInstance } from './player';
import player from './resources/player.json';

class App {
  constructor() {
    const league = new League(4, BANTOM_CLASS);

    const playerInstances = player.players.map((player) => {
      return new PlayerInstance(player);
    });

    league.joinPlayers(playerInstances);

    league.start('winCount');
  }
}

// 부전승, 전적남기기

const app = new App();
