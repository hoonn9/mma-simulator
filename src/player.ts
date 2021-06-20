import { PlayerGrade, PlayerStat, PlayerStyle } from './types/player';

export interface Player {
  name: string;
  height: number;
  weight: number;
  style: PlayerStyle;
  stat: PlayerStat;
  grade: PlayerGrade;
}

export class PlayerInstance implements Player {
  public grade: PlayerGrade;
  constructor(
    public name: string,
    public height: number,
    public weight: number,
    public stat: PlayerStat,
    public style: PlayerStyle,
  ) {
    this.grade = {
      ranking: 0,
    };
  }
}
