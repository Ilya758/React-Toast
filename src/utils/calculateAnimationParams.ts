export const calculateAnimationParams = (lifetime: number) => {
  return {
    percents: 100,
    seconds: lifetime / 1000,
  };
};
