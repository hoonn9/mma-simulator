import { PlayerGrade, PlayerStats, PlayerStyle } from './types/player';

export interface Player {
  name: string;
  height: number;
  weight: number;
  style: PlayerStyle;
  stats: PlayerStats;
  grade: PlayerGrade;
}

export class PlayerInstance {
  constructor(public player: Player) {}
}
