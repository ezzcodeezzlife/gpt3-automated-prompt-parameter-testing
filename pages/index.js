import { useState } from "react";
import { getAllCombinations, makeRequest } from "../lib/getAllCombinations";

const models = ["code-davinci-001", "text-davinci-002"];

// Order: Temparature, Top P, Frequency penalty, Presence penalty
const ranges = [
  [0, 1],
  [0, 1],
  [0, 2],
  [0, 2],
];

export default function Home() {
  const [keyinput, setKeyinput] = useState("");
  const [promptinput, setPromptinput] = useState("");
  const [maxlength, setMaxlength] = useState(0);
  const [model, setModel] = useState("code-davinci-001");

  const testPrompt = async () => {
    const allcombs = getAllCombinations(ranges);
    for (let i = 0; i < allcombs.length; i++) {
      const response = await makeRequest(
        keyinput,
        allcombs[i],
        promptinput,
        maxlength,
        model
      );
      if(response.error){
        console.log(response.error);
      } else {
        //do something with response
      }

      //console.log(response.choices[0].text);
    }
  };

  return (
    <div className="flex flex-col px-4">
      <h2 className="underline">
        Test GPT & Codex Parameters for best results
      </h2>
      <input
        type="text"
        placeholder="OpenAI API Key"
        onChange={(e) => setKeyinput(e.target.value)}
      />
      <input
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
        placeholder="Maximum length"
        onChange={(e) => setMaxlength(e.target.value)}
      />
      <span>Mode: Complete</span>
      <span>Best of: 1</span>
      <span>0.3 Steps</span>
      <p>
        Testing Parameters: Temparature, Top P, Frequency penalty, Presence
        penalty
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={testPrompt}
      >
        Test parameters
      </button>
      {model}
    </div>
  );
}
