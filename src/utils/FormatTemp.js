export function Format(num) {
  const numFormated = num.toString().split(".")[0];

  return parseInt(numFormated);
}
