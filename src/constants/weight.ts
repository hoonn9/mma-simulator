import { Weight, WeightLimit } from '../types/weight';

const FLY_LIMIT: WeightLimit = {
  weightLimit: 56.7,
  difference: 4.5,
};
const BANTOM_LIMIT: WeightLimit = {
  weightLimit: 61.2,
  difference: 4.5,
};
const LIGHT_LIMIT: WeightLimit = {
  weightLimit: 70.3,
  difference: 3.4,
};
const WELTER_LIMIT: WeightLimit = {
  weightLimit: 77.1,
  difference: 3.4,
};
const MIDDLE_LIMIT: WeightLimit = {
  weightLimit: 83.9,
  difference: 4.5,
};
const HEAVY_LIMIT: WeightLimit = {
  weightLimit: 120.2,
};

export const FLY_CLASS: Weight = {
  name: 'fly',
  limit: FLY_LIMIT,
};
export const BANTOM_CLASS: Weight = {
  name: 'bantom',
  limit: BANTOM_LIMIT,
};
export const LIGHT_CLASS: Weight = {
  name: 'light',
  limit: LIGHT_LIMIT,
};
export const WELTER_CLASS: Weight = {
  name: 'welter',
  limit: WELTER_LIMIT,
};
export const MIDDLE_CLASS: Weight = {
  name: 'middle',
  limit: MIDDLE_LIMIT,
};
export const HEAVY_CLASS: Weight = {
  name: 'heavy',
  limit: HEAVY_LIMIT,
};
