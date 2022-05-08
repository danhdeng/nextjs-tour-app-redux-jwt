export const excerpt = (inputString: string, count: number): string => {
  if (inputString.length > count) {
    inputString = inputString.substring(0, count) + " ...";
  }
  return inputString;
};
