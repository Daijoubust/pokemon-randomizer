import { useEffect, useState} from 'react'
import './home.scss'
import test from '../img/eightimage.png'
import axios from 'axios'

const Home = () => {

    const [pokeName, setPokeName] = useState('')
    const [pokeImage, setPokeImage] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        try {
            const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            const response = await axios.get(POKEMON_API_URL);
            const { name: pokemonName, sprites: { other: { "official-artwork": { front_default: artwork } } } } = response.data;
            const capitalizedPokemon = capitalizePokemonName(pokemonName);
            setPokeImage(artwork);
            setPokeName(capitalizedPokemon);
            setButtonClicked(true);
            setLoading(false);
        } catch (error) {
            console.log('Error:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (buttonClicked) {
            fetchData();
        }
    }, [buttonClicked]);


    function generateRandomId() {
        const min = 1;
        const max = 10200;
        const exceptions = Array.from({ length: 899 }, (_, index) => 1011 + index);
        const validNumbers = Array.from({ length: max - min + 1 }, (_, index) => index + min)
            .filter(number => number <= 1010 || (number >= 9999 && number <= 10001 && !exceptions.includes(number)));

        const randomId = Math.floor(Math.random() * validNumbers.length);
        return randomId;
    }

    // const randomId = Math.floor(Math.random() * (max - min + 1)) + min;

    const pokemonId = generateRandomId();

    function capitalizePokemonName(pokemonName) {
        const capitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        return capitalized;
    }

    return (
        <div className='app-container'>
            <div className='content'>
                <h1>Pokemon Randomizer</h1>
                <div className='image-container'>
                    <img src={buttonClicked ? pokeImage : test } alt="" height={200} width={200} />
                </div>
                <h3>{buttonClicked ? pokeName : ''}</h3>
                <button onClick={fetchData} disabled={loading}>
                    {loading ? 'Loading...' : 'Click Here to Random'}
                </button>
            </div>
        </div>
    )
}

export default Home