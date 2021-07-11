import { SKILL_LIST } from './constants/skill';
import { PlayerInstance } from './player';
import { Player } from './types/player';
import { makeRandom } from './utils';

const FIGHT_PLAYER_LIMIT = 2;
const ATTACK_TERM = 1;

type SkillTextProps = {
  attackPlayer: Player;
  defensePlayer: Player;
  damage: number;
};

const displaySkillText = ({ damage, defensePlayer, attackPlayer }: SkillTextProps) => {
  const skill = SKILL_LIST[makeRandom(SKILL_LIST.length - 1)];

  return console.log(
    `${attackPlayer.name}의 ${skill}! ${defensePlayer.name}에게 들어갑니다!!! (damage: ${damage}, hp: ${defensePlayer.stats.hp})`,
  );
};

export class Fight {
  constructor(public players: PlayerInstance[]) {
    if (players.length > FIGHT_PLAYER_LIMIT) {
      throw new Error(`player max limit is ${FIGHT_PLAYER_LIMIT}`);
    }
  }

  private calDamage(player: Player) {
    return player.stats.attack + player.stats.defense;
  }

  private applyDamage(defensePlayer: PlayerInstance, damage: number) {
    defensePlayer.player.stats.hp -= damage;
  }

  private turn(attackPlayer: PlayerInstance, defensePlayer: PlayerInstance) {
    const damage = this.calDamage(attackPlayer.player);
    this.applyDamage(defensePlayer, damage);
    displaySkillText({
      attackPlayer: attackPlayer.player,
      defensePlayer: defensePlayer.player,
      damage: damage,
    });
  }

  private winner(red: PlayerInstance, blue: PlayerInstance) {
    if (red.player.stats.hp <= 0) {
      return blue;
    }
    return red;
  }

  async play() {
    const [red, blue] = JSON.parse(JSON.stringify(this.players));

    while (red.player.stats.hp > 0 && blue.player.stats.hp > 0) {
      switch (makeRandom(1)) {
        case 0:
          this.turn(red, blue);
          break;
        case 1:
          this.turn(blue, red);
          break;
        default:
          throw new Error();
      }
      await new Promise((f) => setTimeout(f, makeRandom(ATTACK_TERM)));
    }
    const winnerInstance = this.winner(red, blue);

    const winner = this.players.find((player) => player.player.id === winnerInstance.player.id);
    const loser = this.players.find((player) => player.player.id !== winnerInstance.player.id);

    if (!winner || !loser) {
      throw new Error('critical error (cannot find winner)');
    }

    winner.win();
    loser.lose();

    console.log(`승자는 ${winner.player.name}입니다!!!!!!!`);

    return {
      winner: winner,
      loser: loser,
    };
  }
}
