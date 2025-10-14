import gjensidigmon from './assets/images/gjensidigmon.png'
import './App.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import getPokemon from './api/getPokemon'
import PokemonCard from './components/PokemonCard'


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
      {isLoading && <div>Loading...</div>} 
      {error && <div>Error: {error.message}</div>}
      {data && <PokemonCard pokemom={data} />}
    </>
  )
}

export default App