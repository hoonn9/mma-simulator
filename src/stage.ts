import { Fight } from './fight';

export class Stage {
  constructor(private fights: Fight[]) {}

  async start() {
    for (const fight of this.fights) {
      fight.play();
      await new Promise((f) => setTimeout(f, 1000));
    }

    // this.fights.forEach(async (fight) => {
    //   fight.play();
    //   await new Promise((f) => setTimeout(f, 1000));
    //   console.log('check');
    // });
  }
}
