import './app.scss'
import NavBar from './components/navbar/NavBar'
import PokemonList from './components/pokemonlist/pokemonList'

const App = () => {
  return (
      <div className="app">
        <div className="flex flex-col center">
          <NavBar />
          <PokemonList/>
        </div>
      </div>
  )
}

export default App
