import { useEffect, useState} from 'react'
import './home.scss'
import axios from 'axios'
import getTypeStyle from '../function/pokemonStyle'
import { generateRandomId , capitalizePokemonName , getPokemonInfoLink, pokeBall } from '../function/function'

const Home = () => {

    const [pokeName, setPokeName] = useState('')
    const [pokeImage, setPokeImage] = useState('')
    const [pokeLink, setPokeLink] = useState('')
    const [pokeType1, setPokeType1] = useState('')
    const [pokeType2 , setPokeType2] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        try {
            const pokemonId = generateRandomId();
            setLoading(true)
            const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            const response = await axios.get(POKEMON_API_URL);
            const { name: pokemonName, sprites: { other: { "official-artwork": { front_default: artwork } } }, types } = response.data;
            const typeNames = types.map(({ type }) => type.name);
            const [FirstType, SecondType] = typeNames;
            const capitalizedPokemon = capitalizePokemonName(pokemonName);
            setPokeType1(FirstType)
            setPokeType2(SecondType)
            setPokeImage(artwork);
            setPokeName(capitalizedPokemon);
            setPokeLink(getPokemonInfoLink(pokemonId, true));
            setButtonClicked(true);
            setLoading(false);
            console.log(FirstType, SecondType);
            console.log(pokemonId);
        } catch (error) {
            console.log('Error:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (buttonClicked) {
            return () => fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[buttonClicked]);

    return (
        <div className='app-container'>
            <div className='content'>
                <div className='title-container'>
                    <h1>Pokemon Randomizer</h1>
                </div>
                <div className='image-container' style={!loading &&  buttonClicked ? getTypeStyle(pokeType1) : null}>
                    <img src={loading || !buttonClicked ? pokeBall : pokeImage} alt="" height={200} width={200} />
                </div>
                <div className='info-container'>
                    <div className='pokemon-container'>
                        <h3><a href={buttonClicked ? pokeLink : '#'}>{buttonClicked ? pokeName : '?'}</a></h3>
                        {loading || buttonClicked ? (
                        <button>Info</button>
                        ) : ''}
                    </div>
                    <div className={buttonClicked ? 'type-container' : ''}>
                        <p style={getTypeStyle(pokeType1)}>{buttonClicked ? pokeType1 : ''}</p>
                        {pokeType2 && <p style={getTypeStyle(pokeType2)}>{buttonClicked ? pokeType2 : ''}</p>}
                    </div>
                    <button className='random' onClick={fetchData} disabled={loading}>
                        {loading ? 'Loading...' : 'Click Here to Random'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home