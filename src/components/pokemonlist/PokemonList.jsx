import { useEffect, useState } from 'react';
import axios from 'axios';
import './pokemonlist.scss';
import getTypeStyle from '../function/pokemonStyle';
import { pokeBall, pokemonTypeList } from '../function/function';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonImages, setPokemonImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 25;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  try {
    const cachedPokemonList = localStorage.getItem('pokemonList');
    const cachedPokemonImages = localStorage.getItem('pokemonImages');

    if (cachedPokemonList && cachedPokemonImages) {
      setPokemonList(JSON.parse(cachedPokemonList));
      setPokemonImages(JSON.parse(cachedPokemonImages));
      setFilteredPokemonList(JSON.parse(cachedPokemonList));
    } else {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1281');
      const { results } = response.data;
      setPokemonList(results);
      fetchPokemonImages(results);
      setFilteredPokemonList(results);

      localStorage.setItem('pokemonList', JSON.stringify(results));
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchPokemonImages = async (pokemonList) => {
  const images = {};

  try {
    const fetchImage = async (pokemon) => {
      const cachedImage = localStorage.getItem(pokemon.name);
      if (cachedImage) {
        images[pokemon.name] = JSON.parse(cachedImage);
      } else {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const { sprites, types } = response.data;
        const typeNames = types.map(({ type }) => type.name);
        const [FirstType, SecondType] = typeNames;

        images[pokemon.name] = {
          url: sprites?.other['official-artwork'].front_default,
          type1: FirstType,
          type2: SecondType || 'default',
        };

        localStorage.setItem(pokemon.name, JSON.stringify(images[pokemon.name]));
      }
    };

    await Promise.all(pokemonList.map(fetchImage));
    setPokemonImages(images);
  } catch (error) {
    console.error('Error:', error);
    for (const pokemon of pokemonList) {
      images[pokemon.name] = {
        url: null,
        type1: '',
        type2: 'default',
      };
    }
    setPokemonImages(images);
  }
};


  const getPokemonUrl = (name) => {
    const pokemon = pokemonList.find((pokemon) => pokemon.name === name);
    return pokemon ? pokemon.url : '';
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
    filterPokemonList(filterType, query); // Filter the list based on the search query and filter type
  };

  const filterPokemonList = (type, query) => {
    const filteredList = pokemonList.filter((pokemon) => {
      const pokemonType1 = pokemonImages[pokemon.name]?.type1 || '';
      const pokemonType2 = pokemonImages[pokemon.name]?.type2 || '';
      return (
        (type === '' || pokemonType1 === type || pokemonType2 === type) &&
        pokemon.name.toLowerCase().includes(query)
      );
    });
    setFilteredPokemonList(filteredList);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    filterPokemonList(type, searchQuery); // Filter the list based on the selected type and search query
  };

  const clearFilter = () => {
    setFilterType('');
    setFilteredPokemonList(pokemonList); // Reset the filtered list to show all pokemons
  };

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemonList = filteredPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="filter-buttons">
        {pokemonTypeList.map((type) => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className={`filter-button ${filterType === type ? 'active' : ''}`}
            style={{ backgroundColor: getTypeStyle(type).backgroundColor }}
          >
            {type}
          </button>
        ))}
        <button
          onClick={clearFilter}
          className={`filter-button ${filterType === '' ? 'active' : ''}`}
        >
          All
        </button>
      </div>
      <div className="container">
        {currentPokemonList.map((pokemon, index) => (
          <div className="pokemon-info" key={index}>
            <div
              className="pokemon-image"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${getTypeStyle(
                  pokemonImages[pokemon.name]?.type1
                )?.backgroundColor}, white)`,
              }}
            >
              <img src={pokemonImages[pokemon.name]?.url || pokeBall} alt={pokemon.name} />
            </div>
            <div className="type-container">
              <p style={getTypeStyle(pokemonImages[pokemon.name]?.type1)}>
                {pokemonImages[pokemon.name]?.type1}
              </p>
              <p style={getTypeStyle(pokemonImages[pokemon.name]?.type2)}>
                {pokemonImages[pokemon.name]?.type2 !== 'default' ? pokemonImages[pokemon.name]?.type2 : '‎ '}
              </p>
            </div>
            <h1>
              <a href={getPokemonUrl(pokemon.name)}>{pokemon.name.toUpperCase()}</a>
            </h1>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredPokemonList.length / pokemonPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PokemonList;
