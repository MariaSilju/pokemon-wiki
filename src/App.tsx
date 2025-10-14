import gjensidigmon from './assets/images/gjensidigmon.png'
import './App.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import getPokemon from './api/getPokemon'
import PokemonCard from './components/PokemonCard'
import ErrorMessage from './components/ErrorMessage'


function App() {

  const [inputText, setInputText] = useState('')
  const [pokemonToSearch, setPokemonToSearch] = useState('')

  const {data, error, isLoading} = useQuery({
    queryKey: ['getPokemon', pokemonToSearch],
    queryFn: () => getPokemon(pokemonToSearch),
    enabled: !!pokemonToSearch,
  })

  return (
    <>
      <div className="image-container">
        <img  src={gjensidigmon} alt="gjensidigmon"/>
      </div>
      <div className="search-container">
        <input 
          type="text"
          placeholder="Search pokemon"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={() => setPokemonToSearch(inputText)}>Search</button>
      </div>
      {isLoading && <h3>Searching for Pokémon...</h3>} 
      {error && <ErrorMessage message={"Couldn't find Pokémon. Please try again"} />}
      {data && <PokemonCard pokemom={data} />}
    </>
  )
}

export default App