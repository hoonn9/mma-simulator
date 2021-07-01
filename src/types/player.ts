export type PlayerStyle = {
  baseFight: string;
  etc: string[];
};

export type PlayerGrade = {
  ranking: number;
  pov: number;
  total: {
    win: number;
    lose: number;
  };
};

export type PlayerStats = {
  attack: number;
  defense: number;
  hp: number;
};

export type Player = {
  id: number;
  name: string;
  height: number;
  weight: number;
  style: PlayerStyle;
  stats: PlayerStats;
  grade: PlayerGrade;
};
