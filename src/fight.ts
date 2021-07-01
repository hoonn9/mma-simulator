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
  const ran = makeRandom(2);

  switch (ran) {
    case 0:
      return console.log(
        `${attackPlayer.name}의 강력한 스트레이트! ${defensePlayer.name}에게 들어갑니다!!! (damage: ${damage}, hp: ${defensePlayer.stats.hp})`,
      );
    case 1:
      return console.log(
        `${attackPlayer.name}의 로우킥! ${defensePlayer.name}에게 들어갑니다!!! (damage: ${damage}, hp: ${defensePlayer.stats.hp})`,
      );
    case 2:
      return console.log(
        `${attackPlayer.name}의 태클! ${defensePlayer.name}에게 들어갑니다!!! (damage: ${damage}, hp: ${defensePlayer.stats.hp})`,
      );
    default:
      throw new Error(`display skill index ${ran} is not exist.`);
  }
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

    if (!winner) {
      throw new Error('critical error (cannot find winner)');
    }
    console.log(`승자는 ${winner.player.name}입니다!!!!!!!`);

    return {
      winner: winner,
    };
  }
}
