import "./App.css";
import axios from "axios";
import { useState } from "react";
import Recipe from "./component/Recipe";
import { v4 as uuid } from "uuid";
import Alert from "./component/Alert";

function App() {
  const [query, setQuery] = useState("");
  const [recipies, setRecipies] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "36295f85";
  const APP_KEY = "9249893cfd9da4caef5896e4db3689da";

  const getData = async () => {
    if (query !== "") {
      const result = await axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with that Name");
      }
      setRecipies(result.data.hits);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Please fill the Input ");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  return (
    <div className="App">
      <h1>food recipe app</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}{" "}
        <input
          type="text"
          placeholder="search food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipies !== [] &&
          recipies.map((recipe) => <Recipe key={uuid()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
