import { updatePlayer } from './json';
import { Player } from './types/player';

export class PlayerInstance {
  constructor(public player: Player) {}

  win() {
    this.player.grade.total.win += 1;
    this.applyGrade();
  }

  lose() {
    this.player.grade.total.lose += 1;
    this.applyGrade();
  }

  private applyGrade() {
    this.player.grade.pov = this.calPOV(this.player);
    updatePlayer(this.player);
  }

  private calPOV(player: Player) {
    const pov = ((player.grade.total.win / (player.grade.total.win + player.grade.total.lose)) * 100).toFixed(2);
    return Number(pov);
  }
}
