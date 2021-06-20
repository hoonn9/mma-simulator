export type Weight = {
  name: string;
  limit: WeightLimit;
};

export type WeightLimit = {
  weightLimit: number;
  difference?: number;
};
