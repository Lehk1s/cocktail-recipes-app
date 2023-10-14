import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
const RANDOM_API_ENDPOINT = '/random.php';
const SEARCH_API_ENDPOINT = '/search.php?s=';

function App() {
  const [cocktail, setCocktail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchRandomCocktail = async () => {
    try {
      const response = await fetch(API_URL + RANDOM_API_ENDPOINT);
      const data = await response.json();
      setCocktail(data.drinks[0]);
    } catch (error) {
      console.error('Error fetching random cocktail:', error);
    }
  };

  const searchCocktail = async () => {
    try {
      const response = await fetch(API_URL + SEARCH_API_ENDPOINT + searchTerm);
      const data = await response.json();
      setSearchResults(data.drinks || []);
    } catch (error) {
      console.error('Error searching cocktail:', error);
    }
  };
  
  const handleCocktailClick = (selectedCocktail) => {
    setCocktail(selectedCocktail);
    setSearchResults([]);
  };
  

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  return (
    <div className="App">
      <h1>Cocktail Recipes</h1>
      <div>
        <button onClick={fetchRandomCocktail}>Get Random Cocktail</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Cocktail"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchCocktail}>Search</button>
      </div>
      {cocktail && (
        <div className="cocktail-details">
          <h2>{cocktail.strDrink}</h2>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <p>{cocktail.strInstructions}</p>
        </div>
      )}
{searchResults.length > 0 && (
  <div className="search-results">
    <h2>Search Results</h2>
    <ul>
      {searchResults.map((result) => (
        <li key={result.idDrink} onClick={() => handleCocktailClick(result)}>
          {result.strDrink}
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
  );
}

export default App;
