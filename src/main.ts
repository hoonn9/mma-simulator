import { BANTOM_LIMIT } from './constants/weight';
import { League } from './league';
import { PlayerInstance } from './player';

class App {
  constructor() {
    const league = new League(4, {
      name: 'bantam',
      limit: BANTOM_LIMIT,
    });

    const newPlayer1 = new PlayerInstance(
      'lee',
      172,
      65,
      {
        attack: 100,
        defense: 100,
        hp: 0,
      },
      {
        baseFight: 'boxing',
        etc: ['kickBoxing'],
      },
    );

    league.joinPlayers(newPlayer1);
    league.joinPlayers([newPlayer1, newPlayer1, newPlayer1]);
  }
}

const app = new App();
