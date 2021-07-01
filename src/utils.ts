export const makeRandom = (length: number) => {
  if (length < 1) {
    throw new Error('random min length is 1');
  }
  return Math.floor(Math.random() * (length + 1));
};
