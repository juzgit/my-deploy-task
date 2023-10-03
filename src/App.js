import React, {useState, useEffect, useRef} from "react";

function App() {
  const [name, setName] = useState(''); //this state variable stores the value entered in the input field.
  const [nationality, setNationality] = useState(''); //this state variable stores the nationality data fetched from the API.
  const inputRef = useRef(); //this ref is used to focus on the input field when the component mounts.


  useEffect( () => {
    inputRef.current.focus(); //this line of code focuses on the input field when the component mounts.
    }, []);


const getNationality = async () => {
  try{
    const response = await fetch(`https://api.nationalize.io?name=${name}`); //this line of code sends a GET request to the nationalize.io API with the name entered in the input field.
    const data = await response.json(); //this line of code parses the response data into JSON format.
    setNationality(data.country[0]); //this line of code sets the nationality state variable with the first country object from the response data.
  } catch (error){
    console.error(error); //this line of code logs any errors that occur during the API request.
  }
};

return (
  <div>
    <input
      type="text"
      ref={inputRef}
      value={name}
      onChange={ (e) => setName(e.target.value)}
      placeholder="Enter a name"
      />
    <button onClick={getNationality}>Predict Nationality</button>
    {nationality && (
      <div>
        <h2>Nationality: {nationality.country_id}</h2> {/**this line of code displays the country ID of the predicted nationality. */}
        <p>Probabilty: {nationality.probability}</p> {/**this line of code displays the probability of the predicted nationality. */}
      </div>
    )}
  </div>
  );
}
export default App;