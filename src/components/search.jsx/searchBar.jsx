import { useState } from 'react';
import axios from 'axios';
import './search.scss'

const PokemonSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281`);
      const { results } = response.data;
      const pokemonNames = results.map(({ name }) => name);
      setSearchResults(pokemonNames);
      console.log(pokemonNames);
    } catch (error) {
      console.log('Error:', error);
      setSearchResults([]);
    }
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchQuery(inputValue);

    if (inputValue === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281`
      );
      const { results } = response.data;
      const filteredResults = results
        .map(({ name }) => name)
        .filter((name) => name.includes(inputValue))
        .slice(0, 10);
      setSearchResults(filteredResults);
    } catch (error) {
      console.log('Error:', error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      {searchResults.map((pokemonName) => (
        <div key={pokemonName}>
          <h2>{pokemonName}</h2>
        </div>
      ))}
    </div>
  );
};

export default PokemonSearch;
