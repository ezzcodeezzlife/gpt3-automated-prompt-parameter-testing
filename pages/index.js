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
  const [responses, setResponses] = useState([]);

  const [allCombinations, setAllcombinations] = useState(0);
  const [counter, setCounter] = useState(0);

  const testPrompt = async () => {
    keyinput === "" || promptinput === "" || maxlength === 0 || model === "" ? (alert("Please refresh & fill out all fields")) : null;
    const allcombs = getAllCombinations(ranges);
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
      <div className="flex flex-col px-4">
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
        <span>0.2 steps</span>
        <p>
          Testing Parameters: Temparature, Top P, Frequency penalty, Presence
          penalty
        </p>


        {allCombinations === 0 ? (<button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={testPrompt}
        >
          Test parameters
        </button>):(<button
          className="bg-gray-200	 hover:bg-grey text-white  font-bold py-2 px-4 rounded"
        >
          Testing
        </button>)}
        

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
