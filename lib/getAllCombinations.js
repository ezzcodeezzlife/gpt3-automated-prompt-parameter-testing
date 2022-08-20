export const getAllCombinations = (ranges = []) => {
  const combinations = [];
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (combinations.length === 0) {
      for (let j = range[0]; j <= range[1]; j += 0.2) {
        combinations.push([j]);
      }
    } else {
      const temp = [];
      for (let n = 0; n < combinations.length; n++) {
        const combination = combinations[n];
        for (let j = range[0]; j <= range[1]; j += 0.2) {
          temp.push(roundToFirstDigit(combination.concat([j])));
        }
      }
      combinations.length = 0;
      combinations.push(...temp);
    }
  }
  return combinations;
};

function roundToFirstDigit(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = Math.round(arr[i] * 10) / 10;
  }
  return arr;
}
