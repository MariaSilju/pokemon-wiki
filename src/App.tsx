import gjensidigmon from './assets/images/gjensidigmon.png'
import './App.css'
import { useState, useEffect } from 'react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import getPokemon from './api/getPokemon'
import getAllPokemon from './api/getAllPokemon'
import { getPokemonPage, type PokemonPage } from './api/getPokemonPage'
import PokemonCard from './components/PokemonCard'
import ErrorMessage from './components/ErrorMessage'
import Modal from './components/Modal'
import type { Pokemon } from './types/pokemon'
import LoadingPokeball from './components/LoadingPokeball'

function App() {

  const [inputText, setInputText] = useState('')
  const [pokemonToSearch, setPokemonToSearch] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [suggestion, setSuggestion] = useState('')

  const {data: searchData, error: searchError, isLoading: searchLoading} = useQuery({
    queryKey: ['getPokemon', pokemonToSearch],
    queryFn: () => getPokemon(pokemonToSearch),
    enabled: !!pokemonToSearch,
  })

  const {data: allPokemonData} = useQuery({
    queryKey: ['getAllPokemon'],
    queryFn: getAllPokemon,
  })

  const { data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['pokemonPages'],
    queryFn: ({ pageParam }) => getPokemonPage(allPokemonData?.results || [], pageParam),
    enabled: !!allPokemonData,
    initialPageParam: 0,
    getNextPageParam: (lastPage: PokemonPage, pages: PokemonPage[]) => lastPage.hasMore ? pages.length : undefined,
  })

  const pokemon = data?.pages?.flatMap((page: PokemonPage) => page.pokemon) || []
  const total = allPokemonData?.results?.length || 0

  const findFirstMatch = (input: string): string => {
    if (!input || !allPokemonData?.results) return ''
    
    const lowerInput = input.toLowerCase()
    const match = allPokemonData.results.find(pokemon => 
      pokemon.name.toLowerCase().startsWith(lowerInput)
    )
    
    return match ? match.name : ''
  }

  useEffect(() => {
    const newSuggestion = findFirstMatch(inputText)
    setSuggestion(newSuggestion)
  }, [inputText, allPokemonData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchTerm = suggestion || inputText
      if (searchTerm) {
        setInputText(searchTerm) 
        setPokemonToSearch(searchTerm)
      } else {
        setPokemonToSearch('')
      }
    }
  }

  return (
    <>
      <div className="header-container">
        <div className="header-content">
          <div className="image-container">
            <img  src={gjensidigmon} alt="gjensidigmon"/>
          </div>
          <div className="search-container">
            <div className="autocomplete-container">
              <input 
                type="text"
                placeholder="Search for a Pokemon..."
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="search-input"
              />
              {suggestion && suggestion.toLowerCase().startsWith(inputText.toLowerCase()) && inputText.length > 0 && (
                <div className="suggestion-overlay">
                  <span className="typed-text">{inputText}</span>
                  <span className="suggestion-text">{suggestion.slice(inputText.length)}</span>
                </div>
              )}
            </div>
            <button onClick={() => {
              const searchTerm = suggestion || inputText
              if (searchTerm) {
                setInputText(searchTerm) 
                setPokemonToSearch(searchTerm)
              } else {
                setPokemonToSearch('')
              }
            }}>Search</button>
          </div>
        </div>
      </div>
      
      {searchLoading && <LoadingPokeball text={`Searching for ${pokemonToSearch}...`} />} 
      {searchError && <ErrorMessage message={"Couldn't find Pokémon. Please try again"} />}
      {searchData && (
        <div className="pokemon-grid">
          <PokemonCard pokemon={searchData} onClick={() => setSelectedPokemon(searchData)} />
        </div>
      )}
      
      {!pokemonToSearch && (
        <>
          {isLoading && <LoadingPokeball text="Loading Pokémon..." />}
          {isError && !isLoading && (
            <div style={{ textAlign: 'center', margin: '10px 0', color: '#666' }}>
              <small>Some Pokémon failed to load</small>
            </div>
          )}
          {pokemon.length > 0 && (
            <>
              <div className="pokemon-grid">
                {pokemon.map((p: Pokemon) => (
                  <PokemonCard key={p.id} pokemon={p} onClick={() => setSelectedPokemon(p)} />
                ))}
              </div>
              {hasNextPage && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: isFetchingNextPage ? '#ccc' : '#4A90E2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {isFetchingNextPage ? 'Loading...' : `Load More Pokémon (${pokemon.length} of ${total})`}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
      
      <Modal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
    </>
  )
}

export default App