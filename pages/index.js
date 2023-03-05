import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

const Home = () => {
  const [file, setFile] = useState("");
  const [legalData, setlegalData] = useState("");
  const [explanation, setExplanation] = useState([]);
  const [summary, setSummary] = useState([]);
  const [result, setResult] = useState("");
  const [legalDataLoading, setlegalDataLoading] = useState(null);
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    console.log(legalData);
    console.log(result);
    console.log(explanation);
    console.log(file);
  }, [explanation, result, file]); 

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }
  const uploadFile = () => {
    
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    // show "loading..." text
    const explanationElement = document.getElementById("loading");
    explanationElement.classList.remove("hidden");

    // Update medical data loading state with true
    setlegalDataLoading(true);

    // Implement check to make sure it is not a blank submission
    if (legalData != "") {

      let response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:
          "Define the legal terms in the following text on separate lines in plain english:\n\n " + legalData,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      
      

      // Update explanation state with the response from GPT-3
      var res = response.data.choices[0].text;
      setResult(res);
      // separate each term's description
      var lines = res.split(/\r?\n/);

      let response2 = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:
          "Summarize the most important points from the following text in a way a 15 year old could understand with each point on a new line beginning with an asterisk:\n\n " + legalData,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      // Update summary state with the response from GPT-3
      var res2 = response2.data.choices[0].text;
      console.log(res2);
      var res2Final = res2.split("*")
      var res2Trimmed = res2Final.filter(item => item.length > 1)
      setSummary(res2Trimmed);


      // remove loading text
      explanationElement.classList.add("hidden");
      var trimmed = [];
      // identify the med term and its definition
      for (let i=0; i<lines.length; i++) {
        if (lines[i].length > 0) {
          trimmed.push(lines[i]);
        }
        
        setExplanation(trimmed);
      }
      

      // Update medical data loading state with false to allow explanation to conditionally render
      setlegalDataLoading(false);
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
        <label class="block text-gray-700 mb-2 heading" for="legal_data">
          enter text:
        </label>
        {/*<input
          class="p-3 mb-4 rounded-lg w-1/2 md:w-1/3 lg:w-1/4 sandy"
          type="text"
          id="legal_data"
          onChange={(e) => setlegalData(e.target.value)}
  />*/}
        <textarea 
          class="p-3 mb-4 rounded-lg w-1/2 md:w-1/3 lg:w-1/4 sandy" 
          id="legal_data"
          onChange={(e) => setlegalData(e.target.value)}
          name="legalData" 
          cols="40" 
          rows="5">
        </textarea>
        <button
          className="submit-btn hover:bg-gray-700 mb-4 font-medium py-2 px-4 rounded-lg min-w-fit w-1/6 md:w-1/8 lg:w-1/12"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* we set explanation element to be loading... or the explanation text based on conditional rendering */}
      {legalDataLoading == false && (
        <div className="report">
          <div class="report-col">
            <label class="block text-gray-700 font-medium" for="explanation">
              Definitions:
            </label>
            <div >
              <p id="explanation" className="p">
                {explanation.map((line, index) => (
                  <div key={index} className="desc">
                    <b>{line.substring(0, line.indexOf(":") + 1)}</b>
                    <p>{line.substring(line.indexOf(":") + 1)}</p>
                  </div>
                ))}
              </p>
            </div>
          </div>
          <div class="report-col">
            <div class="block text-gray-700 font-medium">Summary</div>
            <div class="desc">
              <ul>
              {summary.map((bullet, index) => (
                <li class="summary-item" key={index}>{bullet}</li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <p id="loading" className="hidden">
        simplifying prompt...
      </p>
      <form>
      <label class="block text-gray-700 mb-2 heading" for="file-selector">
          upload file:
      </label>
      <label for="file-selector" class="custom-file-upload">
        choose a file +
      </label>
      <input type="file" id="file-selector" onChange={onFileChange}/>
      {/*<input type="button" id="upload" value="Upload" onClick={uploadFile} />*/}
      <button
        className="submit-btn hover:bg-gray-700 mb-4 font-medium py-2 px-4 rounded-lg min-w-fit w-1/6 md:w-1/8 lg:w-1/12"
        onClick={uploadFile}>
        Submit
      </button>
      </form>

      
    </div>
  );
};

export default Home;
