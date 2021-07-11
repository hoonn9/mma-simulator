import jsonfile from 'jsonfile';
import playerJSON from './resources/player.json';
import { Player } from './types/player';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const getPlayers = async () => {
  const result = await jsonfile.readFile('src/resources/player.json');

  console.log(result);
  return result;
};

// nullable
export const updatePlayer = (props: DeepPartial<Player> & { id: number }) => {
  const players: Player[] = playerJSON.players;

  const playerIndex = players.findIndex((player) => player.id === props.id);

  if (playerIndex < 0) {
    throw new Error(`플레이어 (id:${props.id})는 존재하지 않는 데이터입니다.`);
  }

  const player: Player | undefined = players[playerIndex];

  const updated: Player = {
    ...player,
    ...props,
    style: {
      ...player.style,
      ...props.style,
    },
    grade: {
      ...player.grade,
      ...props.grade,
      total: {
        ...player.grade.total,
        ...props.grade?.total,
      },
    },
    stats: {
      ...player.stats,
      ...props.stats,
    },
  };

  players[playerIndex] = updated;

  jsonfile.writeFile('src/resources/player.json', {
    players: players,
  });
};
