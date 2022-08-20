import { useState } from "react";
import { getAllCombinations } from "../lib/getAllCombinations";
const { Configuration, OpenAIApi } = require("openai");

const models = ["code-davici-002", "text-davinci-002"];

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
  const [model, setModel] = useState("");
  const [steps, setSteps] = useState(0);

  const testPrompt = async () => {
    const configuration = new Configuration({
      apiKey: keyinput,
    });
    const openai = new OpenAIApi(configuration);


    getAllCombinations(ranges, steps).forEach((combination) => {
      console.log(combination);
    });
  };

  return (
    <div className="flex flex-col px-4">
      <h2>Test GPT & Codex Parameters for best results</h2>
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
      <select onChange={(e) => setModel(e.target.value)}>
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
      <span>0.2 Steps</span>
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
    </div>
  );
}
