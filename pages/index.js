import { useState } from "react";
import { getAllCombinations, makeRequest } from "../lib/getAllCombinations";

const models = ["code-davinci-001", "text-davinci-002"];

// Order: Temparature, Top P, Frequency penalty, Presence penalty

export default function Home() {
  const [keyinput, setKeyinput] = useState("");
  const [promptinput, setPromptinput] = useState("");
  const [maxlength, setMaxlength] = useState(0);
  const [model, setModel] = useState("code-davinci-001");
  const [responses, setResponses] = useState([]);

  const [minTemparatureInput, setMinTemparatureInput] = useState(0);
  const [maxTemparatureInput, setMaxTemparatureInput] = useState(1);
  const [minTopPInput, setMinTopPInput] = useState(0);
  const [maxTopPInput, setMaxTopPInput] = useState(1);
  const [minFrequencyPenaltyInput, setMinFrequencyPenaltyInput] = useState(0);
  const [maxFrequencyPenaltyInput, setMaxFrequencyPenaltyInput] = useState(2);
  const [minPresencePenaltyInput, setMinPresencePenaltyInput] = useState(0);
  const [maxPresencePenaltyInput, setMaxPresencePenaltyInput] = useState(2);

  const [allCombinations, setAllcombinations] = useState(0);
  const [counter, setCounter] = useState(0);

  const testPrompt = async () => {
    console.log("buttomPress");
    keyinput === "" || promptinput === "" || maxlength === 0 || model === ""
      ? alert("Please refresh & fill out all fields")
      : null;
    const allcombs = getAllCombinations([
      [Number(minTemparatureInput), Number(maxTemparatureInput)],
      [Number(minTopPInput), Number(maxTopPInput)],
      [Number(minFrequencyPenaltyInput), Number(maxFrequencyPenaltyInput)],
      [Number(minPresencePenaltyInput), Number(maxPresencePenaltyInput)],
    ]);
    setAllcombinations(allcombs.length);

    for (let i = 0; i < allcombs.length; i++) {
      setCounter(i);
      const response = await makeRequest(
        keyinput,
        allcombs[i],
        promptinput,
        maxlength,
        model
      );
      if (response.error) {
        console.log(response.error);
      } else {
        //append to responses
        const myObj = {
          response: response.choices[0].text,
          temparature: allcombs[i][0],
          top_p: allcombs[i][1],
          frequency_penalty: allcombs[i][2],
          presence_penalty: allcombs[i][3],
        };
        setResponses((responses) => [...responses, myObj]);
        console.log(responses);
      }

      //console.log(response.choices[0].text);
    }
  };

  return (
    <>
      <div className="flex flex-col p-4 m-2 bg-blue-100 rounded-3xl">
        <h2 className="underline">
          Test GPT & Codex Parameters for best results
        </h2>
        <input
          type="text"
          placeholder="OpenAI API Key"
          onChange={(e) => setKeyinput(e.target.value)}
        />
        <textarea
          type="text"
          onChange={(e) => setPromptinput(e.target.value)}
          placeholder="Enter your prompt"
        />
        <label>Select Model:</label>
        <select
          onChange={(e) => setModel(e.target.value)}
          defaultValue="code-davinci-001"
        >
          {models.map((model) => (
            <option key={Math.random()} value={model}>
              {model}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Maximum length (Max. 4000)"
          onChange={(e) => setMaxlength(e.target.value)}
        />
        <span>Mode: Complete</span>
        <span>Best of: 1</span>
        <span>0.1 steps</span>

        <p>Finetune parameters (possible ranges)</p>
        <input
          type="text"
          placeholder="minTemparature (0)"
          onChange={(e) => setMinTemparatureInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="maxTemparature (1)"
          onChange={(e) => setMaxTemparatureInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="minTopP (0)"
          onChange={(e) => setMinTopPInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="maxTopP (1)"
          onChange={(e) => setMaxTopPInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="minFrequencyPenalty (0)"
          onChange={(e) => setMinFrequencyPenaltyInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="maxFrequencyPenalty (2)"
          onChange={(e) => setMaxFrequencyPenaltyInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="minPresencePenalty (0)"
          onChange={(e) => setMinPresencePenaltyInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="maxPresencePenalty (2)"
          onChange={(e) => setMaxPresencePenaltyInput(e.target.value)}
        />

        {allCombinations === 0 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={testPrompt}
          >
            Test parameters
          </button>
        ) : (
          <button className="bg-gray-200	 hover:bg-grey text-white  font-bold py-2 px-4 rounded">
            Testing
          </button>
        )}
      </div>

      <div>{counter + "/" + allCombinations} request completed</div>

      <div>
        {responses ? (
          responses.map((response) => (
            <div key={Math.random()} className="p-3 m-3 border-2 bg-slate-100">
              <b>
                <p> {response.temparature} Temparature </p>
                <p> {response.top_p} Top P</p>
                <p> {response.frequency_penalty} Frequency penalty </p>
                <p> {response.presence_penalty} Presence penalty</p>
              </b>
              {response.response}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
