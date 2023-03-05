import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

const Home = () => {
  const [medicalData, setMedicalData] = useState("");
  //const [explanation, setExplanation] = useState("");
  const [explanation, setExplanation] = useState([]);
  const [result, setResult] = useState("");
  const [medicalDataLoading, setMedicalDataLoading] = useState(null);
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    console.log(medicalData);
    console.log(result);
    console.log(explanation);
  }, [explanation, result]); 

  const handleSubmit = async (e) => {

    e.preventDefault();
    // show "loading..." text
    const explanationElement = document.getElementById("loading");
    explanationElement.classList.remove("hidden");

    // Update lease data loading state with true
    setMedicalDataLoading(true);

    // Implement check to make sure it is not a blank submission
    if (medicalData != "") {

      let response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "summarize most important points on seperate lines with headers, with each header starting with the word HEADER \n\n " + medicalData,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      
      // remove loading text
      explanationElement.classList.add("hidden");

      // Update explanation state with the response from GPT-3
      var res = response.data.choices[0].text;
      setResult(res);
      // separate each term's description
      var lines = res.split(/\r?\n/);
      
      var trimmed = [];
      for (let i=0; i<lines.length; i++) {
        if (lines[i].length > 0) {
          trimmed.push(lines[i]);
        }
        
        setExplanation(trimmed);
      }
      
      // Update lease data loading state with false to allow explanation to conditionally render
      setMedicalDataLoading(false);
    } else {
      explanationElement.innerText = "You did not submit anything, please submit again."
    }
  };

  return (
    <div className="p-6 mb-4">
      <form
        className="flex flex-col bg-whiterounded-lg"
        onSubmit={handleSubmit}
      >
        <label class="block text-gray-700 mb-2 font-medium" for="medical_data">
          Input your lease here:
        </label>
        <input
          class="p-3 mb-4 bg-gray-200 rounded-lg w-1/2 md:w-1/3 lg:w-1/4"
          type="text"
          id="medical_data"
          onChange={(e) => setMedicalData(e.target.value)}
        />
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white mb-4 font-medium py-2 px-4 rounded-lg min-w-fit w-1/6 md:w-1/8 lg:w-1/12"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* we set explanation element to be loading... or the explanation text based on conditional rendering */}
      {medicalDataLoading == false && (
        <div className="flex flex-col">
          <label class="block text-gray-700 font-medium" for="explanation">
            Breakdown:
          </label>
          <div class="md:w-1/2 lg:w-1/3 p-3">
            <p id="explanation" className="p">
              {explanation.map((line, index) => (
                
                <div key={index} className="desc">
                  {line.includes("HEADER") ?  
                  <b>{line.substring(line.indexOf("HEADER") + 6) }</b>
                   :
                   <li>{line}</li> }
                  
                </div>
              ))}
            </p>
          </div>
        </div>
      )}
      <p id="loading" className="hidden">
        simplifying prompt...
      </p>
    </div>
  );
};

export default Home;
