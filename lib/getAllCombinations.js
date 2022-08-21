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

async function sleep() {
  return new Promise(function (resolve, reject) {
    console.log("sleeping due to 429 error")
    setTimeout(function () {
      resolve("anything");
    }, 60000);
  });
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
      temperature: combination[0],
      max_tokens: Number(maxlength),
      top_p: combination[1],
      frequency_penalty: combination[2],
      presence_penalty: combination[3],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      requestOptions
    );
    response.status === 429 ? await sleep() : console.log("no 429");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
