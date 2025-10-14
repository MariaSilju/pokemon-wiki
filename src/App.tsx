import gjensidigmon from './assets/images/gjensidigmon.png'
import './App.css'
import { useState } from 'react'
import { useQuery, useQueries } from '@tanstack/react-query'
import getPokemon from './api/getPokemon'
import PokemonCard from './components/PokemonCard'
import ErrorMessage from './components/ErrorMessage'


function App() {

  const [inputText, setInputText] = useState('')
  const [pokemonToSearch, setPokemonToSearch] = useState('')

  const initialPokemonIds = [1, 4, 7, 25, 39, 52, 104, 132, 143, 150]


  const {data: searchData, error: searchError, isLoading: searchLoading} = useQuery({
    queryKey: ['getPokemon', pokemonToSearch],
    queryFn: () => getPokemon(pokemonToSearch),
    enabled: !!pokemonToSearch,
  })

  const initialQueries = useQueries({
    queries: initialPokemonIds.map(id => ({
      queryKey: ['getPokemon', id.toString()],
      queryFn: () => getPokemon(id.toString()),
    }))
  })

  const initialPokemon = initialQueries
    .filter(query => query.data)
    .map(query => query.data)
  const initialLoading = initialQueries.some(query => query.isLoading)
  const initialError = initialQueries.some(query => query.error)

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
      
      {/* Search Results */}
      {searchLoading && <h3>Searching for Pokémon...</h3>} 
      {searchError && <ErrorMessage message={"Couldn't find Pokémon. Please try again"} />}
      {searchData && (
        <div className="pokemon-grid">
          <PokemonCard pokemon={searchData} />
        </div>
      )}
      
      {/*Pokemon search results */}
      {!pokemonToSearch && (
        <>
          {initialLoading && <h3>Loading Pokémon...</h3>}
          {initialError && <ErrorMessage message={"Error loading Pokémon"} />}
          {initialPokemon.length > 0 && (
            <div className="pokemon-grid">
              {initialPokemon.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default App