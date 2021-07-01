import { Fight } from './fight';
import { PlayerInstance } from './player';

const FIGHT_TERM = 0;

export class Stage {
  winners?: PlayerInstance[];
  constructor(private fights: Fight[]) {}

  async start() {
    const winners = [];
    for (let i = 0; i < this.fights.length; i++) {
      const fight = this.fights[i];

      const { winner } = await fight.play();
      winners.push(winner);

      if (i === this.fights.length - 1) {
        console.log(`모든 경기가 끝났습니다.`);
        break;
      }
      console.log(`${i + 1}번째 경기가 끝났습니다. ${(FIGHT_TERM / 1000).toFixed(2)}초 후 다음 경기가 이어집니다.`);
      await new Promise((f) => setTimeout(f, FIGHT_TERM));
    }

    this.winners = winners;
  }
}
