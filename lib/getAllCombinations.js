export const getAllCombinations = (ranges = []) => {
  const combinations = [];
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (combinations.length === 0) {
      for (let j = range[0]; j <= range[1]; j += 1) {
        combinations.push([j]);
      }
    } else {
      const temp = [];
      for (let n = 0; n < combinations.length; n++) {
        const combination = combinations[n];
        for (let j = range[0]; j <= range[1]; j += 1) {
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

export const makeRequest = async (
    key,
  combination,
  promptinput,
  maxlength,
  model
) => {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(key),
    },
    body: JSON.stringify({
      model: model,
      prompt: promptinput,
      temperature: 0.1,
      max_tokens: Number(maxlength),
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.5,
    }),
  };




  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
