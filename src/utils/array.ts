export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];
  // Fisher–Yates shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const put = <T>(arr: T[], ix: number, value: T): T[] => [
  ...arr.slice(0, ix),
  value,
  ...arr.slice(ix + 1, arr.length),
];
