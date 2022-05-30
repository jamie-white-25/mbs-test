export const calculate = (base_rate: number, convert_rate: number): number => {
  return base_rate * (Math.ceil(100 * convert_rate) / 100);
};
